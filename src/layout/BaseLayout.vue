<template>
	<div class="wrapper bg-grey">
		<TheHeader />
		<main class="main">
			<slot />
		</main>
		<TheFooter />
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

.wrapper {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

.bg-grey {
	background-color: var(--grey-light);
}
</style>
