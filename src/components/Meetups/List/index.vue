<template>
	<FadeTransitionGroup tag="div" class="meetups-list transition-list">
		<MeetupsListItem
			v-for="meetup in meetups"
			:meetup="meetup"
			:key="meetup.id"
		></MeetupsListItem>
	</FadeTransitionGroup>
</template>

<script>
import FadeTransitionGroup from '@/components/Transition/FadeTransitionGroup.vue';
import MeetupsListItem from '@/components/Meetups/List/MeetupsListItem.vue';

export default {
	name: 'MeetupsList',

	props: {
		meetups: {
			type: Array,
			required: true
		}
	},

	components: {
		MeetupsListItem,
		FadeTransitionGroup
	}
};
</script>

<style scoped></style>
