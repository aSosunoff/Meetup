<template>
	<div class="container">
		<div class="filters-panel">
			<div class="filters-panel__col">
				<form-check
					:options="dateFilterOptions"
					:selected="date"
					@change="$emit('update:date', $event)"
				></form-check>
			</div>

			<div class="filters-panel__col">
				<div class="form-group form-group_inline">
					<div class="input-group input-group_icon input-group_icon-left">
						<img alt="icon" src="@/assets/icons/icon-search.svg" class="icon" />
						<input
							id="filters-panel__search"
							class="form-control form-control_rounded form-control_sm"
							type="text"
							placeholder="Поиск"
							:value="search"
							@input="$emit('update:search', $event.target.value)"
						/>
					</div>
				</div>
				<div class="form-group form-group_inline">
					<page-tabs :selected="view" @select="$emit('update:view', $event)"></page-tabs>
				</div>
			</div>
		</div>

		<transition v-if="filteredMeetups && filteredMeetups.length" name="fade" mode="out-in">
			<meetups-list
				v-if="view === '' || view === 'list'"
				:meetups="filteredMeetups"
				key="list"
			></meetups-list>
			<meetups-calendar
				v-else-if="view === 'calendar'"
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
import fetchJson from '@/utils/fetch-json';
import { ImageService } from '@/utils/helpful';

export default {
	name: 'MeetupsPage',

	props: {
		view: String,
		date: String,
		participation: String,
		search: String
	},

	data() {
		return {
			meetups: [],
			dateFilterOptions: [
				{ text: 'Все', value: 'all' },
				{ text: 'Прошедшие', value: 'past' },
				{ text: 'Ожидаемые', value: 'future' }
			]
		};
	},

	async mounted() {
		const meetups = await fetchJson(`${process.env.VUE_APP_API_URL}/meetups`);
		this.meetups = meetups;
	},

	computed: {
		filteredMeetups() {
			let filteredMeetups = this.meetups.map(meetup => ({
				...meetup,
				cover: meetup.imageId ? `${ImageService.getImageURL(meetup.imageId)}` : undefined,
				date: new Date(meetup.date)
			}));

			if (this.date === 'past') {
				filteredMeetups = filteredMeetups.filter(
					meetup => new Date(meetup.date) <= new Date()
				);
			} else if (this.date === 'future') {
				filteredMeetups = filteredMeetups.filter(
					meetup => new Date(meetup.date) > new Date()
				);
			}

			if (this.participation === 'organizing') {
				filteredMeetups = filteredMeetups.filter(meetup => meetup.organizing);
			} else if (this.participation === 'attending') {
				filteredMeetups = filteredMeetups.filter(({ attending }) => attending);
			}

			if (this.search) {
				const concatMeetupText = ({ title, description, place, organizer }) =>
					[title, description, place, organizer].join(' ').toLowerCase();

				filteredMeetups = filteredMeetups.filter(meetup => {
					const concat = concatMeetupText(meetup);
					return concat.includes(this.search.toLowerCase());
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
