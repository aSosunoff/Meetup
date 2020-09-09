<template>
	<div class="form__buttons">
		<slot />
	</div>
</template>

<script>
export default {
	name: 'FormButtons'
};
</script>

<style scoped>
.form__buttons {
	display: flex;
	flex-direction: column;
	padding: 0 40px;
	margin-top: 40px;
}
</style>
