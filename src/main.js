import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import axios from 'axios'
import App from './App.vue';
import router from './router/index.js'

const token = localStorage.getItem('jwt_token');

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const app = createApp(App);
app.config.globalProperties.$http = axios; // 全局挂载
// 4. 使用 Element Plus 和 Vue Router
app.use(ElementPlus);
app.use(router);
app.use(axios);
// 5. 挂载应用
app.mount('#app');