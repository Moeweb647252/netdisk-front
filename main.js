import { createApp } from 'vue/dist/vue.esm-bundler';
import naive from "naive-ui/es/preset";
import Main from "./src/Main.vue";
import Settings from "./src/Settings.vue"
import Login from "./src/Login.vue"
import { createRouter, createWebHashHistory } from "vue-router";
import { createPinia } from 'pinia';

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/settings",
    component: Settings,
  },
  {
    path: "/login",
    component: Login,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

const app = createApp({});
const pinia = createApp();

app.use(router);
app.use(naive);
app.use(pinia);
app.mount("#main");
