import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/access";

// 引入 Arco Design Vue 组件库
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";

// 引入 bytemd 样式
import 'bytemd/dist/index.css'

const app = createApp(App);
app.use(ArcoVue);
app.use(store);
app.use(router);
app.mount("#app");
