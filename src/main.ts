import { createApp } from 'vue'
import { createPinia } from 'pinia';
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './shared/routes/index'
import './plugins/axios';

const pinia = createPinia();
const app = createApp(App)

app.use(pinia);
app.use(ElementPlus)
app.use(router)
app.mount('#app')