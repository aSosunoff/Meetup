<template>
	<div class="meetup-agenda">
		<p class="meetup-agenda__empty" v-if="!isAgenda">
			Программа пока пуста, но когда-нибудь в ней обязательно что-нибудь появится!
		</p>

		<MeetupAgendaItem v-else v-for="item of meetup.agenda" :key="item.id" :agendaItem="item" />
	</div>
</template>

<script>
import MeetupAgendaItem from '@/components/MeetupAgendaItem.vue';

export default {
	name: 'MeetupAgenda',

	props: {
		meetup: Object
	},

	computed: {
		isAgenda() {
			return Boolean(this.meetup.agenda && this.meetup.agenda.length);
		}
	},

	components: {
		MeetupAgendaItem
	}
};
</script>

<style scoped>
.meetup-agenda {
	margin: 0;
}
</style>
