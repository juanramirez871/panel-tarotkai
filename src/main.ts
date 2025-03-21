import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './shared/routes/index'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.mount('#app')