<template>
	<div class="form__append">
		<slot />
	</div>
</template>

<script>
export default {
	name: 'form-append'
};
</script>

<style scoped>
.form__append {
	margin-top: 40px;
	text-align: center;
	font-weight: 400;
	font-size: 20px;
	line-height: 28px;
}
</style>
