<template>
	<ul class="info-list">
		<li>
			<app-icon icon="user" class="info-list__icon" />
			{{ meetup.organizer }}
		</li>
		<li>
			<app-icon icon="map" class="info-list__icon" />
			{{ meetup.place }}
		</li>
		<li>
			<app-icon icon="cal-lg" class="info-list__icon" />
			<time :datetime="hideDate">{{ visibleDate }}</time>
		</li>
	</ul>
</template>

<script>
import AppIcon from '@/components/AppIcon.vue';

export default {
	name: 'MeetupInfo',

	props: {
		meetup: {
			type: Object,
			required: true
		}
	},

	methods: {
		formatDate(timestamp, options) {
			return new Intl.DateTimeFormat(navigator.language, options).format(timestamp);
		}
		/*
		localeDate: new Date(meetup.date).toLocaleString(navigator.language, {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
		*/
	},

	computed: {
		visibleDate() {
			return this.formatDate(this.meetup.date, {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
		},
		hideDate() {
			return this.formatDate(this.meetup.date, {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
		}
	},

	components: {
		AppIcon
	}
};
</script>

<style scoped>
.info-list {
	margin: 0;
	padding: 0;
}

.info-list li {
	list-style-type: none;
	position: relative;
	padding-left: 36px;
	font-size: 18px;
	line-height: 28px;
	margin: 0 0 8px;
}

.info-list li:last-child {
	margin: 0;
}

.info-list__icon {
	position: absolute;
	left: 0;
	top: 0;
}
</style>
