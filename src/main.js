import { createApp } from "vue/dist/vue.esm-bundler";
import naive from "naive-ui/es/preset";
import Main from "./Main.vue";
import Settings from "./Settings.vue";
import Login from "./Login.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";

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
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
const pinia = createPinia();
pinia.use(piniaPluginPersist);
const app = createApp();
app.use(pinia);
app.use(router);
app.use(naive);
app.mount("#main");
