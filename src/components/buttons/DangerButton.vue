<template>
	<BaseButton class="button_danger" v-bind="$attrs" v-on="$listeners">
		<slot />
	</BaseButton>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue';

export default {
	name: 'DangerButton',
	inheritAttrs: false,
	components: {
		BaseButton
	}
};
</script>

<style scoped>
.button_danger {
	background-color: var(--white);
	border-color: var(--red);
	color: var(--red);
}

.button_danger:hover {
	border-color: var(--red-light);
}
</style>
