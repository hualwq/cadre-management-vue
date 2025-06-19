import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import axios from 'axios';
import App from './App.vue';
import router from './router/index.js';

const token = sessionStorage.getItem('jwt_token');

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const app = createApp(App);
app.config.globalProperties.$http = axios;

app.use(ElementPlus);
app.use(router);

app.mount('#app');
