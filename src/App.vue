<template>
	<div id="app">
		<div
			class="progress"
			style="width: 75%; background-color: rgb(76, 107, 182); opacity: 1;"
		></div>
		<BaseLayout>
			<router-view />
		</BaseLayout>
	</div>
</template>

<script>
import BaseLayout from '@/components/layout/BaseLayout.vue';

export default {
	name: 'App',

	components: { BaseLayout }
};
</script>

<style scoped></style>
