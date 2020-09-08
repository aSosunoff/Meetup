<template>
	<FormPage title="Редактирование митапа" submitText="Редактировать" :meetup="meetup" />
</template>

<script>
import FormPage from '@/components/FormPage.vue';
import { MeetupServise } from '@/utils/helpful';

export default {
	name: 'EditPage',

	data() {
		return {
			meetup: {
				date: new Date()
			}
		};
	},

	beforeRouteEnter(to, from, next) {
		MeetupServise.getMeetupById(to.params.meetupId).then(meetup => {
			next(vm => vm.setMeetup(meetup));
		});
	},

	beforeRouteUpdate(to, from, next) {
		if (to.params.meetupId === from.params.meetupId) {
			next();
		} else {
			MeetupServise.getMeetupById(to.params.meetupId).then(meetup => {
				this.setMeetup(meetup);
				next();
			});
		}
	},

	props: {},

	watch: {},

	methods: {
		setMeetup(meetup) {
			this.meetup = {
				...meetup,
				date: new Date(meetup.date)
			};
		}
	},

	computed: {},

	components: {
		FormPage
	}
};
</script>

<style scoped></style>
