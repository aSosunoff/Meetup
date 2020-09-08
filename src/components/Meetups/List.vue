<template>
	<div class="meetups-list transition-list">
		<transition-group name="transition-list">
			<MeetupListItem
				v-for="meetup in meetups"
				:meetup="meetup"
				:key="meetup.id"
			></MeetupListItem>
		</transition-group>
	</div>
</template>

<script>
import MeetupListItem from '@/components/MeetupsListItem.vue';

export default {
	name: 'MeetupsList',

	props: {
		meetups: {
			type: Array,
			required: true
		}
	},

	components: {
		MeetupListItem
	}
};
</script>

<style scoped></style>
