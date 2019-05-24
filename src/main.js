import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import News from './components/News.vue'
import Cat from './components/Cat.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
	{ path: '/news', component: News },
	{ path: '/cat', component: Cat }
]

const router = new VueRouter({
	routes
})

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
