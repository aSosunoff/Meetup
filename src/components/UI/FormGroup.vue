<template>
	<div class="form-group" :class="{ 'form-group_inline': inline }">
		<label class="form-label" v-if="title">{{ title }}</label>
		<slot />
	</div>
</template>

<script>
export default {
	name: 'form-group',

	props: {
		title: {
			type: String,
			default: ''
		},
		inline: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style scoped>
.form-group {
	position: relative;
	margin-bottom: 24px;
}

.form-label {
	font-weight: 400;
	font-size: 20px;
	line-height: 28px;
	color: var(--body-color);
	margin-bottom: 10px;
	display: block;
}

.form-group.form-group_inline {
	display: inline-block;
	margin-bottom: 0;
}
</style>
