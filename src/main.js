import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import News from './components/News.vue'
import Cat from './components/Cat.vue'
import About from './components/About.vue'
import Item from './components/Item.vue'
import '@/assets/main.css'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
	{ path: '*', redirect: '/news' },
	{ path: '/news', component: News },
	{ path: '/cat', component: Cat },
	{ path: '/about', component: About },
	{ path: '/item', component: Item, name: 'item', props: true }
]

const router = new VueRouter({
	routes
})

Vue.mixin({
	methods: {
		getJSON (url, callback) {
			const xhr = new XMLHttpRequest()
			xhr.open('GET', url, true)
			xhr.responseType = 'json'

			xhr.onload = () => {
				callback(xhr)
			}

			xhr.send()
		}
	}
})

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
