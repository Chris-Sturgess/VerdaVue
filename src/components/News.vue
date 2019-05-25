<template>
	<div class="news">
		<h1>Recent News</h1>
		<div class="loading">
			<button v-if="loading" class="loading-button" disabled>Loading...</button>
			<button v-else v-on:click="fetchNews">Refresh</button>
		</div>
		<div class="news-list">
			<div class="error" v-if="error">
				{{ error }}
			</div>
			<div class="stories" v-else>
				<p v-if="lastRefresh">Last Refresh: {{lastRefresh}}</p>
				<div class="story" v-bind:key="index" v-for="(story, index) in stories">
					<h2>
						<router-link :to="{name : 'item', query : {story: story.rawJSON}}">{{ story.title }}</router-link>
					</h2>
					<p>Submitted By: {{ story.user }} on {{ story.date }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			loading: false,
			error: null,
			stories: [],
			rawJSON: null,
			lastRefresh: null,
		}
	},

	created () {
		this.fetchNews()
	},

	watch: {
		'$route': 'fetchData'
	},

	methods: {
		callback (xhr) {
			const status = xhr.status

			if (status === 200) {
				const items = xhr.response.slice(0, 25)

				for (const item of items) {
					const date = new Date(item.time * 1000)
					item.rawJSON = JSON.stringify(item)
					item.date = this.timeString(date)
				}

				this.lastRefresh = this.timeString(new Date())
				this.stories = items
				this.loading = false
			} else {
				this.error = 'Error ' + status + ' loading page'
				this.loading = false
			}
		},

		timeString(date) {
			return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString()
		},

		fetchNews () {
			this.loading = true
			this.error = null
			this.stories = []

			// Get News
			this.getJSON('https://api.hnpwa.com/v0/news/1.json', this.callback)
		}
	}
}
</script>
