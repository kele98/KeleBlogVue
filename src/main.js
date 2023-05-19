import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'//引入axios

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
// app.config.globalProperties.$axios = axios;//把axios挂载到vue上
app.mount('#app')
