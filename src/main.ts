import { createApp } from 'vue';
import App from './App.vue';
import '@/styles/index.scss';
import router from '@/router';
import pinia from './store';
import VueAwesomePaginate from 'vue-awesome-paginate';
import 'vue-awesome-paginate/dist/style.css';
import '@mdi/font/css/materialdesignicons.css';

const app = createApp(App);
app.use(VueAwesomePaginate);
app.use(pinia);
app.use(router);

app.mount('#app');
