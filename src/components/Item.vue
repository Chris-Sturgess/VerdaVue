<template>
	<div class="item">
		<h1>Details for "{{story.title}}"</h1>
		<div class="item-table">
			<div class="item-row" v-bind:key="prop" v-for="(val, prop) in story">
				<div class="item-cell right">{{ prop }}</div>
				<div class="item-cell left">{{ val }}</div>
			</div>
			<div class="item-row">
				<div class="item-cell right">Raw</div>
				<div class="item-cell left">{{ rawJSON }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			story: this.$route.query,
			rawJSON: JSON.stringify(this.$route.query)
		}
	}
}
</script>
