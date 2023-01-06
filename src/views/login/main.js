import { createApp } from "vue";
import naive from "naive-ui";
import Login from "./Login.vue";

const app = createApp(Login);
app.use(naive);

app.mount("#login");
