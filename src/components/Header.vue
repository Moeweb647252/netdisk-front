<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const _go = ()=>{
  router.push("/settings")
}

</script>

<template>
  <div class="ui-nav" style="">
    <n-space justify="space-between" style="width: 100%">
      <span class="ui-logo"> Nekoit </span>
      <n-input-group>
        <n-input
          :style="{ width: '50%' }"
          style="width: 300px"
          placeholder="搜索文件"
        />
        <n-button type="primary" ghost> 搜索 </n-button>
      </n-input-group>
      <div>
        <n-button @click="_go()">
          <n-icon size="24">
            <img src="../assets/MdSettings.svg" />
          </n-icon>
        </n-button>
      </div>
    </n-space>
  </div>
</template>

<style>
.ui-logo {
  cursor: pointer;
  display: flex;
  font-size: 18px;
}

.ui-nav {
  display: flex;
  align-items: center;
  padding: 0 var(--side-padding);
  --side-padding: 32px;
  height: 64px;
}
</style>
