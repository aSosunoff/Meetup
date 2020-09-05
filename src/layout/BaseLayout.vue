<template>
	<div id="app">
		<div
			class="progress"
			style="width: 75%; background-color: rgb(76, 107, 182); opacity: 1;"
		></div>

		<div class="wrapper bg-grey">
			<TheHeader />

			<main class="main">
				<slot />
			</main>

			<TheFooter />
		</div>
	</div>
</template>

<script>
import TheHeader from '@/layout/TheHeader.vue';
import TheFooter from '@/layout/TheFooter.vue';

export default {
	name: 'BaseLayout',
	components: { TheHeader, TheFooter }
};
</script>

<style scoped>
main {
	flex: 1 0 auto;
}
</style>
