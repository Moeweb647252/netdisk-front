<script setup>
import Header from "./components/Header.vue";
import FileManager from "./components/FileManager.vue";
import { ref } from "vue";

const path = ref([]);

</script>

<template>
  <n-layout bordered>
    <n-layout-header bordered>
      <Header />
    </n-layout-header>
    <n-layout has-sider>
      <n-layout-sider> </n-layout-sider>
      <n-layout>
        <br />
        <br />
        <n-message-provider>
          <FileManager :path="path" />
        </n-message-provider>
      </n-layout>
      <n-layout-sider> </n-layout-sider>
    </n-layout>
  </n-layout>
</template>
