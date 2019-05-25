<template>
	<div class="cat">
		<h1>Cat</h1>
		<div class="loading">
			<p v-if="loading">Loading...</p>
			<button v-else v-on:click="fetchImage">New Cat</button>
		</div>
		
		<div>
			<div v-if="error" class="error">
				{{ error }}
			</div>
			<div v-else class="cat-image" v-if="image" >
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
			error: null,
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

			// Get News
			this.getJSON('https://aws.random.cat/meow', this.callback)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
