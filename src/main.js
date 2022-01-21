import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/tailwind.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
library.add(faPlus)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .use(store)
    .mount('#app')

store.dispatch("handleLogin");
