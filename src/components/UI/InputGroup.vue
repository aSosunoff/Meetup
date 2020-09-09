<template>
	<div class="input-group">
		<slot />
	</div>
</template>

<script>
export default {
	name: 'InputGroup'
};
</script>

<style scoped>
.input-group {
	position: relative;
}
</style>
