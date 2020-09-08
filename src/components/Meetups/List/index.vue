<template>
	<FadeTransitionGroup tag="div" class="meetups-list transition-list">
		<Item v-for="meetup in meetups" :meetup="meetup" :key="meetup.id"></Item>
	</FadeTransitionGroup>
</template>

<script>
import FadeTransitionGroup from '@/components/Transition/FadeTransitionGroup.vue';
import Item from '@/components/Meetups/List/Item.vue';

export default {
	name: 'MeetupsList',

	props: {
		meetups: {
			type: Array,
			required: true
		}
	},

	components: {
		Item,
		FadeTransitionGroup
	}
};
</script>

<style scoped></style>
