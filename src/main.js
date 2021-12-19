import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import {generatePermissionTree, userPermission} from "./plugins/permissions";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

store.dispatch("bindCampaign").then(() => {
  store.commit("setUserPermission", userPermission())
  store.commit("userPermissionTree", generatePermissionTree())
})

store.dispatch("bindNPCs")
store.dispatch("bindUsers")

store.dispatch("handleLogin")
