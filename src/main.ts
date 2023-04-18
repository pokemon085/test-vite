import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router';
import pinia from './store';


// 创建vue实例
const app = createApp(App);
app.use(pinia)
app.use(router);

// 挂载实例
app.mount('#app');






