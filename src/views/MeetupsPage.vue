<template>
	<div class="container">
		<div class="filters-panel">
			<div class="filters-panel__col">
				<form-check
					:options="dateFilterOptions"
					:selected="options.date"
					@change="options = { ...options, date: $event }"
				></form-check>
			</div>

			<div class="filters-panel__col">
				<div class="form-group form-group_inline">
					<div class="input-group input-group_icon input-group_icon-left">
						<img alt="icon" :src="iconSearch" class="icon" />
						<input
							id="filters-panel__search"
							class="form-control form-control_rounded form-control_sm"
							type="text"
							placeholder="Поиск"
							:value="options.search"
							@input="
								options = {
									...options,
									search: $event.target.value
								}
							"
						/>
					</div>
				</div>
				<div class="form-group form-group_inline">
					<page-tabs
						:selected="options.view"
						@update:selected="
							options = {
								...options,
								view: $event
							}
						"
					></page-tabs>
				</div>
			</div>
		</div>

		<transition v-if="filteredMeetups && filteredMeetups.length" name="fade" mode="out-in">
			<meetups-list
				v-if="options.view === '' || options.view === 'list'"
				:meetups="filteredMeetups"
				key="list"
			></meetups-list>
			<meetups-calendar
				v-else-if="options.view === 'calendar'"
				:meetups="filteredMeetups"
				key="calendar"
			></meetups-calendar>
		</transition>
		<app-empty v-else>Митапов по заданным условиям не найдено...</app-empty>
	</div>
</template>

<script>
import MeetupsList from '@/components/MeetupsList.vue';
import MeetupsCalendar from '@/components/MeetupsCalendar.vue';
import PageTabs from '@/components/PageTabs.vue';
import FormCheck from '@/components/FormCheck.vue';
import AppEmpty from '@/components/AppEmpty.vue';
import iconSearch from '@/assets/icons/icon-search.svg';
import fetchJson from '@/utils/fetch-json';

const defaults = {
	view: 'list',
	date: 'all',
	participation: 'all',
	search: ''
};

export default {
	name: 'MeetupsPage',

	data() {
		return {
			iconSearch,
			meetups: [],
			options: {
				view: defaults.view,
				date: defaults.date,
				participation: defaults.participation,
				search: defaults.search
			},
			dateFilterOptions: [
				{ text: 'Все', value: 'all' },
				{ text: 'Прошедшие', value: 'past' },
				{ text: 'Ожидаемые', value: 'future' }
			]
		};
	},

	watch: {
		options: {
			deep: true,
			handler(newQuery) {
				const query = Object.fromEntries(
					Object.entries(newQuery).filter(([key, value]) => defaults[key] !== value)
				);

				this.$router.push({ path: '/', query }).catch(err => {
					if (
						err.name !== 'NavigationDuplicated' &&
						!err.message.includes('Avoided redundant navigation to current location:')
					) {
						throw err;
					}
				});
			}
		},
		'$route.query': {
			immediate: true,
			handler(newQuery) {
				this.options = Object.fromEntries(
					Object.keys(this.options).map(key => [key, newQuery[key] || defaults[key]])
				);
			}
		}
	},

	async mounted() {
		const meetups = await fetchJson(`${process.env.VUE_APP_API_URL}/meetups`);
		this.meetups = meetups;
	},

	computed: {
		filteredMeetups() {
			let filteredMeetups = this.meetups.map(meetup => ({
				...meetup,
				cover: meetup.imageId
					? `${process.env.VUE_APP_API_URL}/images/${meetup.imageId}`
					: undefined,
				date: new Date(meetup.date),
				localeDate: new Date(meetup.date).toLocaleString(navigator.language, {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})
			}));

			if (this.options.date === 'past') {
				filteredMeetups = filteredMeetups.filter(
					meetup => new Date(meetup.date) <= new Date()
				);
			} else if (this.options.date === 'future') {
				filteredMeetups = filteredMeetups.filter(
					meetup => new Date(meetup.date) > new Date()
				);
			}

			if (this.options.participation === 'organizing') {
				filteredMeetups = filteredMeetups.filter(meetup => meetup.organizing);
			} else if (this.options.participation === 'attending') {
				filteredMeetups = filteredMeetups.filter(({ attending }) => attending);
			}

			if (this.options.search) {
				const concatMeetupText = ({ title, description, place, organizer }) =>
					[title, description, place, organizer].join(' ').toLowerCase();

				filteredMeetups = filteredMeetups.filter(meetup => {
					const concat = concatMeetupText(meetup);
					return concat.includes(this.options.search.toLowerCase());
				});
			}

			return filteredMeetups;
		}
	},

	components: {
		MeetupsList,
		MeetupsCalendar,
		PageTabs,
		FormCheck,
		AppEmpty
	}
};
</script>

<style scoped>
.form-control.form-control_rounded {
	border-radius: 26px;
}

.form-control.form-control_sm.form-control_rounded {
	border-radius: 22px;
}

.form-control.form-control_sm {
	padding: 8px 16px;
	height: 44px;
	border-radius: 4px;
}

.input-group {
	position: relative;
}

.input-group .form-control {
	width: 100%;
}

.input-group.input-group_icon .form-control {
	padding-left: 50px;
}

.input-group.input-group_icon .icon {
	position: absolute;
	top: 50%;
	transform: translate(0, -50%);
}

.input-group.input-group_icon.input-group_icon-left .icon {
	left: 16px;
}

.input-group.input-group_icon.input-group_icon-right .icon {
	right: 16px;
}

.form-group.form-group_inline {
	display: inline-block;
	margin-bottom: 0;
}

.form-group.form-group_inline + .form-group.form-group_inline {
	margin-left: 16px;
}

.form-control {
	padding: 12px 16px;
	height: 52px;
	border-radius: 8px;
	border: 2px solid var(--blue-light);
	font-family: 'Nunito', sans-serif;
	font-weight: 600;
	font-size: 20px;
	line-height: 28px;
	color: var(--body-color);
	transition: 0.2s all;
	background-color: var(--white);
	outline: none;
	box-shadow: none;
}

.form-control::placeholder {
	font-weight: 400;
	color: var(--blue-2);
}

.form-control:focus {
	border-color: var(--blue);
}

.filters-panel {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 40px 0 32px 0;
}

.filters-panel__col {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
}

@media all and (max-width: 767px) {
	.filters-panel {
		flex-direction: column;
	}

	.filters-panel__col + .filters-panel__col {
		margin-top: 16px;
	}
}

@media all and (max-width: 480px) {
	#filters-panel__search {
		width: calc(100% - 112px);
	}

	#filters-panel__search >>> .form-control {
		max-width: 100%;
	}
}
</style>
