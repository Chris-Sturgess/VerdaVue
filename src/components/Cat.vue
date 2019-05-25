<template>
	<div class="cat">
		<h1>Cat</h1>
		<div class="loading">
			<button v-if="loading" disabled>Loading...</button>
			<button v-else v-on:click="fetchImage">New Cat</button>
		</div>
		<div>
			<div v-if="error" class="error">
				{{ error }}
			</div>
			<div v-else class="cat-image">
				<img :src="image" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			loading: false,
			image: null,
			error: null
		}
	},

	created () {
		this.fetchImage()
	},

	watch: {
		'$route': 'fetchImage'
	},

	methods: {
		callback (xhr) {
			const status = xhr.status

			if (status === 200) {
				this.image = xhr.response.file
				this.loading = false
			} else {
				this.error = 'Error ' + status + ' loading image'
				this.loading = false
			}
		},

		fetchImage () {
			this.loading = true
			this.error = null
			// Don't reset image because you want to see a cat while loading

			this.getJSON('https://aws.random.cat/meow', this.callback)
		}
	}
}
</script>
