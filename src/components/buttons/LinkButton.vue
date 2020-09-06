<template>
	<BaseButton class="link" v-bind="$attrs" v-on="$listeners">
		<slot />
	</BaseButton>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue';

export default {
	name: 'LinkButton',
	inheritAttrs: false,
	components: {
		BaseButton
	}
};
</script>

<style scoped>
.link {
	color: var(--blue);
	text-decoration: none;
}

.link:hover {
	text-decoration: underline;
}
</style>
