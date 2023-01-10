<script setup>
import Header from "./components/Header.vue";
import FileManager from "./components/FileManager.vue";
import { reactive, ref, h, onMounted, render } from "vue";
import { NIcon } from "naive-ui";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/user";
import DownloadSettings from "./components/settings/DownloadSettings.vue";
import RSSDownloaderManager from "./components/settings/RSSDownloaderManager.vue";
import UserManager from "./components/settings/UserManager.vue";
import {
  CaretDownOutline,
  FileTrayFullOutline,
  SettingsOutline,
  DownloadOutline,
  LogoRss,
  PeopleCircleOutline,
} from "vicons/ionicons-v5";

const path = ref([]);
const router = useRouter();
const user = useUserStore();
const collapsed = ref(h(FileManager, { path: path.value, user: user }));
const showedComponent = ref();
const mainHeightStyle = reactive({ value: "max-height: 100px" });
const heightStyle = reactive({ value: "height: 100px" });

if (!user.isLoggedIn) {
  router.push("/login");
}

const renderIcon = (icon) => () => h(NIcon, null, { default: () => h(icon) });

const menuOptions = [
  {
    label: "查看文件",
    key: "fileManager",
    viewVifName: "fm",
    icon: renderIcon(FileTrayFullOutline),
    component: h(FileManager, { path: path.value, user: user }),
  },
  {
    label: "管理",
    key: "settings",
    viewVifName: "settings",
    icon: renderIcon(SettingsOutline),
    children: [
      {
        label: "下载设置",
        key: "downloadSettings",
        viewVifName: "downloadSettings",
        icon: renderIcon(DownloadOutline),
        component: h(DownloadSettings),
      },
      {
        label: "RSS订阅管理",
        key: "rssDownloaderManager",
        viewVifName: "rssDownloaderManager",
        icon: renderIcon(LogoRss),
        components: h(RSSDownloaderManager),
      },
      {
        label: "用户管理",
        key: "userManager",
        icon: renderIcon(PeopleCircleOutline),
        components: h(UserManager),
      },
    ],
  },
];

const expandIcon = () => h(NIcon, null, { default: () => h(CaretDownOutline) });

const renderMenuLabel = (option) => {
  return option.label;
};

const renderMenuIcon = (menuOption) => menuOption.icon();

const menuUpdateHandler = (key, option) => {
  showedComponent.value = option.component;
};

const resizeMain = () => {
  heightStyle.value =
    "height: " +
    (window.innerHeight - document.getElementById("header").clientHeight - 1) +
    "px";
  mainHeightStyle.value =
    "max-height: " +
    (window.innerHeight - document.getElementById("header").clientHeight) *
      0.8 +
    "px";
};

document.title = "查看文件";

onMounted(() => {
  window.addEventListener("resize", () => {
    resizeMain();
  });
  resizeMain();
});
</script>

<template>
  <n-layout bordered>
    <n-layout-header bordered id="header">
      <Header />
    </n-layout-header>
    <n-layout has-sider :style="heightStyle.value">
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
        style="z-index: 999999"
      >
        <n-menu
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          :render-label="renderMenuLabel"
          :expand-icon="expandIcon"
          :render-icon="renderMenuIcon"
          :on-update:value="menuUpdateHandler"
        />
      </n-layout-sider>
      <n-layout style="margin-left: 10%; margin-right: 10%; margin-top: 3%">
        <n-card title="" size="medium">
          <n-scrollbar :style="mainHeightStyle.value">
            <component :is="showedComponent"></component>
          </n-scrollbar>
        </n-card>
      </n-layout>
    </n-layout>
  </n-layout>
</template>
