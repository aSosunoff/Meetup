<template>
	<div class="container">
		<div class="filters-panel">
			<div class="filters-panel__col">
				<FormCheck :options="dateFilterOptions" v-model="query.date"></FormCheck>
			</div>

			<div class="filters-panel__col">
				<FormGroup inline>
					<InputGroup class="input-group_icon input-group_icon-left">
						<img alt="icon" src="@/assets/icons/icon-search.svg" class="icon" />
						<input
							id="filters-panel__search"
							class="form-control form-control_rounded form-control_sm"
							type="text"
							placeholder="Поиск"
							v-model="query.search"
						/>
					</InputGroup>
				</FormGroup>
				<FormGroup inline>
					<PageTabs v-model="query.view"></PageTabs>
				</FormGroup>
			</div>
		</div>

		<FadeTransition v-if="filteredMeetups && filteredMeetups.length">
			<List
				v-if="query.view === '' || query.view === 'list'"
				:meetups="filteredMeetups"
				key="list"
			></List>
			<MeetupsCalendar
				v-else-if="query.view === 'calendar'"
				:meetups="filteredMeetups"
				key="calendar"
			></MeetupsCalendar>
		</FadeTransition>
		<AppEmpty v-else>Митапов по заданным условиям не найдено...</AppEmpty>
	</div>
</template>

<script>
import MeetupsCalendar from '@/components/Meetups/MeetupsCalendar.vue';
import List from '@/components/Meetups/List/index.vue';
import PageTabs from '@/components/Meetups/PageTabs.vue';
import FormCheck from '@/components/FormCheck.vue';
import AppEmpty from '@/components/AppEmpty.vue';
import FadeTransition from '@/components/Transition/FadeTransition.vue';
import FormGroup from '@/components/UI/FormGroup.vue';
import InputGroup from '@/components/UI/InputGroup.vue';
import { ImageService, MeetupServise } from '@/utils/helpful';

const defaults = {
	view: 'list',
	date: 'all',
	participation: 'all',
	search: ''
};

export default {
	name: 'Meetups',

	props: {},

	data() {
		return {
			meetups: [],
			dateFilterOptions: [
				{ text: 'Все', value: 'all' },
				{ text: 'Прошедшие', value: 'past' },
				{ text: 'Ожидаемые', value: 'future' }
			],
			query: {
				view: defaults.view,
				date: defaults.date,
				participation: defaults.participation,
				search: defaults.search
			}
		};
	},

	watch: {
		query: {
			deep: true,
			handler(newQuery) {
				const query = Object.fromEntries(
					Object.entries(newQuery).filter(([key, value]) => defaults[key] !== value)
				);

				this.$router.push({ path: this.$route.path, query }).catch(err => {
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
				this.query = Object.fromEntries(
					Object.keys(this.query).map(key => [key, newQuery[key] || defaults[key]])
				);
			}
		}
	},

	async mounted() {
		const meetups = await MeetupServise.getMeetups();
		this.meetups = meetups;
	},

	computed: {
		filteredMeetups() {
			let filteredMeetups = this.meetups.map(meetup => ({
				...meetup,
				cover: meetup.imageId ? `${ImageService.getImageURL(meetup.imageId)}` : undefined,
				date: new Date(meetup.date)
			}));

			if (this.query.date === 'past') {
				filteredMeetups = filteredMeetups.filter(
					meetup => new Date(meetup.date) <= new Date()
				);
			} else if (this.query.date === 'future') {
				filteredMeetups = filteredMeetups.filter(
					meetup => new Date(meetup.date) > new Date()
				);
			}

			if (this.query.participation === 'organizing') {
				filteredMeetups = filteredMeetups.filter(meetup => meetup.organizing);
			} else if (this.query.participation === 'attending') {
				filteredMeetups = filteredMeetups.filter(({ attending }) => attending);
			}

			if (this.query.search) {
				const concatMeetupText = ({ title, description, place, organizer }) =>
					[title, description, place, organizer].join(' ').toLowerCase();

				filteredMeetups = filteredMeetups.filter(meetup => {
					const concat = concatMeetupText(meetup);
					return concat.includes(this.query.search.toLowerCase());
				});
			}

			return filteredMeetups;
		}
	},

	components: {
		List,
		MeetupsCalendar,
		PageTabs,
		FormCheck,
		AppEmpty,
		FormGroup,
		InputGroup,
		FadeTransition
	}
};
</script>

<style scoped>
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

.form-group.form-group_inline + .form-group.form-group_inline {
	margin-left: 16px;
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
