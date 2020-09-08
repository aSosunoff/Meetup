<template>
	<div class="meetups-list transition-list">
		<transition-group name="transition-list">
			<Item v-for="meetup in meetups" :meetup="meetup" :key="meetup.id"></Item>
		</transition-group>
	</div>
</template>

<script>
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
		Item
	}
};
</script>

<style scoped></style>
