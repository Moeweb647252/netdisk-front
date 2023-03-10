<script setup>
import { reactive, ref, Transition, nextTick, onMounted } from "vue";
import axios from "axios";
import { WebsiteConfig } from "../config/websiteConfig.js";
import { useMessage } from "naive-ui";
import { values } from "lodash";
import ClipboardJS from "clipboard";

const props = defineProps(["path", "user", "type"]);


const messager = useMessage();
const clipboardJs = new ClipboardJS(".clipboard-btn");
const pasteFiles = reactive({
  removeSource: null,
  list: [],
});
const fileList = ref([]);
const path = ref(props.path);
const selectedFiles = ref(null);
const containerRef = ref(void 0);
const clipButtonRef = ref(null);
const showFileContextMenuRef = ref(false);
const isLoadingRef = ref(false);
const clipText = ref("");
const allowedOperations = reactive({
  copy: true,
  cut: true,
  paste: true,
  share: true,
  download: true,
  getLink: true,
  getInfo: true,
})

let contextMenuDetectedFile = null;

const contextMenuX = ref(0);
const contextMenuY = ref(0);

const loadUserDirectory = async () => {
  if (!props.user.isLoggedIn){
    return
  }
  fileList.value = new Array();
  isLoadingRef.value = true;
  axios
    .get(WebsiteConfig.apis.fsUserFiles, {
      params: {
        path: path.value.join("/"),
        token: props.user.token,
      },
    })
    .then((response) => {
      if (response.data.code != 1000) {
        messager.error("出错了～");
        return;
      }
      fileList.value = response.data.data
        .filter((obj) => {
          return obj.isDir;
        })
        .concat(
          response.data.data.filter((obj) => {
            return !obj.isDir;
          })
        );
      isLoadingRef.value = false;
    })
    .catch(function (error) {
      messager.error("请求失败");
    });
};

const loadDirectory = () => {
  if (props.type == "user"){
    loadUserDirectory();
  }
};

const changePath = (p) => {
  path.value = p;
  loadDirectory();
};

const formatBytes = (a, b = 2) => {
  if (!+a) return "0 Bytes";
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${
    ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
  }`;
};
const isEmpty = (obj) => {
  return !!values(obj).length;
};

const _values = (obj) => {
  //console.log(values(obj).filter(item=>item.isDir).length);
  return values(obj);
};

const _output = (obj) => {
  console.log(obj);
};

const handleFileContextMenu = (e, file) => {
  contextMenuDetectedFile = file;
  e.preventDefault();
  showFileContextMenuRef.value = false;
  nextTick().then(() => {
    showFileContextMenuRef.value = true;
    contextMenuX.value = e.clientX;
    contextMenuY.value = e.clientY;
  });
};

const handleFileContextMenuSelect = (key) => {
  key(contextMenuDetectedFile);
};

const handleClickOutsideFileContextMenu = () => {
  showFileContextMenuRef.value = false;
};

const downloadFile = (file) => {
  showFileContextMenuRef.value = false;
  messager.info("要下载: " + file.name);
};

const enterDirectory = (file) => {
  showFileContextMenuRef.value = false;
  if (!file.isDir) {
    messager.error("出错了～");
    return;
  }
  path.value = file.path.split("/").slice(1);
  loadDirectory();
};

const getFileDownloadLink = (file) => {
  return file.path + "/" + file.name;
};

const copyFileDownloadLink = (file) => {
  showFileContextMenuRef.value = false;
  clipText.value = getFileDownloadLink(file);
  nextTick().then(() => {
    clipButtonRef.value.click();
  });
};

const fileContextMenuOptions = () => {
  if (!contextMenuDetectedFile) return new Array();
  const result = new Array();
  if (contextMenuDetectedFile.isDir) {
    result.push({
      label: "打开",
      key: enterDirectory,
    });
  } else {
    result.push({
      label: "下载",
      key: downloadFile,
    });
    result.push({
      label: "复制链接",
      key: copyFileDownloadLink,
    });
  }
  return result;
};

const copyHandler = () => {
  pasteFiles.removeSource = false;
  pasteFiles.list = [];
  selectedFiles.value.forEach((v)=>{
    pasteFiles.list.push(fileList.value[v]);
  });
  selectedFiles.value = [];
};

const cutHandler = () => {
  pasteFiles.removeSource = true;
  selectedFiles.value.forEach((v)=>{
    pasteFiles.list.push(fileList.value[v]);
  });
  selectedFiles.value = [];
}

const pasteHandler = () => {
  const files = [];
  values(pasteFiles.list).forEach((v)=>{
    files.push(v.path);
  })
  axios.post(WebsiteConfig.apis.fsAllPaste, {
    token: props.user.token,
    pasteFiles: files,
    destPath: path.value.join("/"),
    removeSource: pasteFiles.removeSource,
    fsType: props.type
  }).then((resp)=>{
    if(resp.data.code == 1000){
      if (pasteFiles.removeSource){
        messager.success("剪切成功!");
      } else {
        messager.success("复制成功!");
      }
    } else {
      messager.error(WebsiteConfig.errors[resp.date.code])
    }
  })
}

onMounted(() => {
  clipboardJs.on("error", (e) => {
    messager.error("出错了～");
  });

  clipboardJs.on("success", (e) => {
    messager.success("复制成功！");
  });
  loadDirectory();
});
</script>
<template>
  <div ref="containerRef">
    <button
      style="display: none"
      class="clipboard-btn"
      ref="clipButtonRef"
      :data-clipboard-text="clipText"
    ></button>
    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :x="contextMenuX"
      :y="contextMenuY"
      :options="fileContextMenuOptions()"
      :show="showFileContextMenuRef"
      :on-clickoutside="handleClickOutsideFileContextMenu"
      @select="handleFileContextMenuSelect"
    />
    <n-card title="文件管理" size="huge" :bordered="false">
      <template #header-extra>
        <n-breadcrumb>
          <n-breadcrumb-item @click="changePath([])">ROOT</n-breadcrumb-item>
          <n-breadcrumb-item
            v-for="i in [...new Array(path.length).keys()]"
            @click="changePath(path.slice(0, i + 1))"
          >
            {{ path[i] }}
          </n-breadcrumb-item>
        </n-breadcrumb>
      </template>
      <br />
      <n-checkbox-group v-model:value="selectedFiles">
        <n-table>
          <thead>
            <th>&nbsp;</th>
            <th>名称</th>
            <th>大小</th>
            <th>修改时间</th>
          </thead>
          <tbody>
            <tr v-for="(i, index) in fileList">
              <td><n-checkbox :value="index" /></td>
              <td>
                <n-button
                  quaternary
                  type="primary"
                  v-if="i.isDir"
                  @click="changePath(path.concat([i.name]))"
                  @contextmenu="handleFileContextMenu($event, i)"
                >
                  <n-ellipsis style="max-width: 240px">
                    {{ i.name }}
                  </n-ellipsis>
                </n-button>
                <n-button
                  quaternary
                  type="info"
                  @contextmenu="handleFileContextMenu($event, i)"
                  v-else
                >
                  <n-ellipsis style="max-width: 240px">
                    {{ i.name }}
                  </n-ellipsis>
                </n-button>
              </td>
              <td>{{ formatBytes(i.stat[6]) }}</td>
              <td><n-time :time="i.stat[8]" :to="8640000" unix /></td>
            </tr>
          </tbody>
        </n-table>
        <n-space vertical v-if="isLoadingRef">
          <n-skeleton text :repeat="2" />
          <n-skeleton text :repeat="2" />
          <n-skeleton text :repeat="2" />
          <n-skeleton text :repeat="2" />
        </n-space>
      </n-checkbox-group>
    </n-card>
  </div>
  <div
    style="position: fixed; bottom: 50px; right: 25px; z-index: 99999"
  >
    <n-space vertical>
        <n-button
          @click="copyHandler"
          round secondary
          type="info"
          size="medium"
          v-if="allowedOperations.copy && isEmpty(selectedFiles)"
          >复制</n-button
        >
      <n-button
        @click="cutHandler"
        round
        secondary
        type="info"
        size="medium"
        v-if="allowedOperations.cut && isEmpty(selectedFiles)"
        >剪切</n-button
      >
      <n-button
        @click="pasteHandler"
        round
        secondary
        type="info"
        size="medium"
        v-if="allowedOperations.paste && pasteFiles.list.length"
        >粘贴</n-button
      >
      <n-button
        @click=""
        round
        secondary
        type="info"
        size="medium"
        v-if="allowedOperations.download && _values(selectedFiles).length && !_values(selectedFiles).some((item) => fileList[item].isDir)"
        >下载</n-button
      >
      <n-button
        @click=""
        round
        secondary
        type="info"
        size="medium"
        v-if="allowedOperations.getLink && _values(selectedFiles).length == 1"
        >链接</n-button
      >
      <n-button
        @click=""
        round
        secondary
        type="info"
        size="medium"
        v-if="allowedOperations.share && _values(selectedFiles).length"
        >分享</n-button
      >
      <n-button
        @click=""
        round
        secondary
        type="info"
        size="medium"
        v-if="allowedOperations.getInfo && _values(selectedFiles).length == 1"
        >详情</n-button
      >
    </n-space>
  </div>
  <n-modal v-model:show="showPasteModal">
    <n-card
      style="width: 600px"
      title="粘贴"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        
      </template>
      <!-- list duplicate paste file -->
      <n-list>
        <n-list-item v-for="i in repeatPasteFiles">
          <!-- file info and operation -->
          <n-space>
            <n-icon
              v-if="i.isDir"
              :icon="faFolder"
              :size="24"
              :color="themeRef.value.primaryColor"
            ></n-icon>
            <n-icon
              v-else
              :icon="faFile"
              :size="24"
              :color="themeRef.value.primaryColor"
            ></n-icon>
            <n-ellipsis style="max-width: 240px">
              {{ i.name }}
            </n-ellipsis>
          </n-space>
          <n-space>
            <n-button
              @click="replaceFile(i)"
              round
              secondary
              type="info"
              size="medium"
            >
              替换
            </n-button>
            <n-button
              @click="renameFile(i)"
              round
              secondary
              type="info"
              size="medium"
            >
              重命名
            </n-button>
          </n-space>
          
        </n-list-item>
      </n-list>
      <template #footer>
        
      </template>
    </n-card>
  </n-modal>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(25px);
  opacity: 0;
}
</style>
