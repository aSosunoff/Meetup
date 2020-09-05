<template>
	<img class="icon" alt="icon" :src="iconSrc" />
</template>

<script>
import { iconMap } from '@/utils/helpful';

export default {
	name: 'AppIcon',

	props: {
		icon: {
			type: String,
			required: true,
			validate: name => Object.keys(iconMap).includes(name)
		}
	},

	computed: {
		iconSrc() {
			return iconMap[this.icon];
		}
	}
};
</script>

<style scoped></style>
