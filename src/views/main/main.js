import { createApp } from "vue";
import naive from "naive-ui/es/preset";
import Main from "./Main.vue";

const app = createApp(Main);

app.use(naive);
app.mount("#main");
