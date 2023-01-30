import './permission'
import router from './router'
import store from './store'
import { createApp } from 'vue'
import App from './App.vue'

import directives from './directives'

import '@/styles/index.scss'
import 'normalize.css/normalize.css'
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(directives).use(router).use(store).mount('#app')
