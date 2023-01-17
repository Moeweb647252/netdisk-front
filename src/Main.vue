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
import { CaretDownOutline, FileTrayFullOutline, SettingsOutline, DownloadOutline, LogoRss, PeopleCircleOutline } from "vicons/ionicons-v5";

const router = useRouter();
const user = useUserStore();
if (!user.is_logged_In) {
  router.push("/login");
}
const collapsed = ref(false);
const showed_component = ref()
const main_height_style = reactive({value: 'max-height: 100px'});
const height_style = reactive({value: 'height: 100px'});
const menu_value = ref();
const path = ref([]);

const renderIcon = (icon) => () => h(NIcon, null, { default: () => h(icon) })

const menu_options = [
  {
    label: "查看文件",
    key: "fileManager",
    viewVifName: "fm",
    icon: renderIcon(FileTrayFullOutline),
    component: h(FileManager, {path: path.value, user:user, type:"user"})
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
        component: h(DownloadSettings)
      },
      {
        label: "RSS订阅管理",
        key: "rssDownloaderManager",
        viewVifName: "rssDownloaderManager",
        icon: renderIcon(LogoRss),
        components: h(RSSDownloaderManager)
      },
      {
        label: "用户管理",
        key: "userManager",
        icon: renderIcon(PeopleCircleOutline),
        components: h(UserManager)
      }
    ]
  }
];

const expandIcon = ()=>h(NIcon, null, { default: () => h(CaretDownOutline) });

const renderMenuLabel = (option) => {
  return option.label;
}


const renderMenuIcon = (menuOption)=>menuOption.icon();

const menuUpdateHandler = (key, option)=>{
  showed_component.value=option.component;
}

const resizeMain = ()=>{
  height_style.value = "height: " + (window.innerHeight - document.getElementById("header").clientHeight - 1) + "px";
  main_height_style.value = "max-height: " + (window.innerHeight - document.getElementById("header").clientHeight)*0.8 + "px";
}

document.title = "查看文件";

onMounted(()=>{
  window.addEventListener('resize', ()=>{
    resizeMain();
  })
  resizeMain();
  menu_value.value = "fileManager";
  if (user.fs_id){
    showed_component.value = h(FileManager, {path: path.value, user:user, type:"user"});
  } else {
    //show empty
    showed_component.value = h("div");
  }
})

</script>

<template>
  <n-layout bordered>
    <n-layout-header bordered id="header">
      <Header />
    </n-layout-header>
    <n-layout has-sider :style="height_style.value">
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :collapsed="collapsed"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
          style="z-index: 999999;"
        >
          <n-menu
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menu_options"
            :render-label="renderMenuLabel"
            :expand-icon="expandIcon"
            :render-icon="renderMenuIcon"
            :value="menu_value"
            :on-update:value="menuUpdateHandler"
          />
        </n-layout-sider>
        <n-layout style="margin-left: 10%;margin-right: 10%; margin-top: 3%;">
          <n-card title="" size="medium">
            <n-scrollbar :style="main_height_style.value">
              <component :is="showed_component"></component>
            </n-scrollbar>
          </n-card>
        </n-layout>
    </n-layout>
  </n-layout>
</template>
