import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/tailwind.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

console.log(1, process.env.VUE_)

store.dispatch("bindCampaign")
store.dispatch("bindNPCs")

store.dispatch("handleLogin")
