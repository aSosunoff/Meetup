<template>
	<FormPage title="Создать митап" submitText="Создать" :meetup="meetup" />
</template>

<script>
import FormPage from '@/components/FormPage.vue';

export default {
	name: 'CreatePage',

	data() {
		return {
			meetup: { date: new Date(), agenda: [] }
		};
	},

	props: {},

	watch: {},

	methods: {},

	computed: {},

	components: {
		FormPage
	}
};
</script>

<style scoped></style>
