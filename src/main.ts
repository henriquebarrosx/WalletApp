import { createApp } from 'vue'

import App from './App.vue'
import './assets/stylesheet/global.css'
import { CategoriesService } from './services/categories'

const app = createApp(App)

app.provide('CategoriesService', new CategoriesService())

app.mount('#app')
