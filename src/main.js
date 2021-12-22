import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import {generatePermissionTree, userPermission} from "./plugins/permissions";
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import enUS from '@kangc/v-md-editor/lib/lang/en-US';

VueMarkdownEditor.use(vuepressTheme);
VueMarkdownEditor.lang.use('en-US', enUS);

Vue.use(VueMarkdownEditor);

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
