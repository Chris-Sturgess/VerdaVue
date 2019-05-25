<template>
	<div id="app">
		<div id="header">
			<div class="link">
				<router-link to="/news">News</router-link>
			</div>
			<div class="link">
				<router-link to="/cat">Cat</router-link>
			</div>
			<div class="link">
				<router-link to="/about">About</router-link>
			</div>
		</div>
		<div id="main-window">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
	name: 'app',
	components: {}
}
</script>

<style>
</style>
