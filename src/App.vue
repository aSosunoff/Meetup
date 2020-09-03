<template>
	<base-layout id="app">
		<router-view />
	</base-layout>
</template>

<script>
import BaseLayout from './components/BaseLayout.vue';

export default {
	name: 'App',
	components: { BaseLayout }
};
</script>

<style scoped></style>
