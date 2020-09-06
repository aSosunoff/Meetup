<template>
	<div class="input-group">
		<slot />
	</div>
</template>

<script>
export default {
	name: 'input-group'
};
</script>

<style scoped>
.input-group {
	position: relative;
}
</style>
