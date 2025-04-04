// main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './plugins/axios';
import { setDayjs } from './plugins/day';
import { createAppRouter } from './shared/routes/index';

const pinia = createPinia();
export const app = createApp(App);

setDayjs(app);

app.use(pinia);
app.use(ElementPlus);

const router = createAppRouter();
app.use(router);

app.mount('#app');
