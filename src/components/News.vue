<template>
	<div class="news">
		<h1>Recent News</h1>
		<div class="loading">
			<button v-if="loading" disabled>Loading...</button>
			<button v-else v-on:click="fetchNews">Refresh</button>
		</div>
		<div class="news-list">
			<div v-if="error" class="error">
				{{ error }}
			</div>
			<div v-else class="stories">
				<p v-if="lastRefresh">Last Refresh: {{lastRefresh}}</p>
				<div class="story" v-bind:key="index" v-for="(story, index) in stories">
					<h2>
						<router-link :to="{name : 'item', query : story}">{{ story.title }}</router-link>
					</h2>
					<p>Submitted By: {{ story.user }} on {{ formattedDate(story) }}</p>
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
			lastRefresh: null
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
				this.stories = xhr.response.slice(0, 25)
				this.lastRefresh = this.timeString(new Date())
				this.loading = false
			} else {
				this.error = 'Error ' + status + ' loading page'
				this.loading = false
			}
		},

		timeString (date) {
			return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString()
		},

		formattedDate (item) {
			return this.timeString(new Date(item.time * 1000))
		},

		fetchNews () {
			this.loading = true
			this.error = null
			// UX: Since the news probably won't change, flash the page so it feels like it definitely updated
			this.stories = []

			this.getJSON('https://api.hnpwa.com/v0/news/1.json', this.callback)
		}
	}
}
</script>
