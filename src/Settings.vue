<script setup>
import HeaderVue from './components/Header.vue';
import { ref,reactive } from 'vue';
import { useUserStore } from './stores/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = useUserStore();

if (!user.getLoginState()){
 router.push("/login") 
}

user = useUserStore()

document.title = "设置"

</script>
<template>
  <n-layout bordered>
    <n-layout-header bordered>
      <HeaderVue />
    </n-layout-header>
    <n-layout has-sider>
      <n-layout-sider> </n-layout-sider>
      <n-layout>
        <br />
        <br />
        <n-message-provider>
          <n-card title="" size="medium">
            
          </n-card>
        </n-message-provider>
      </n-layout>
      <n-layout-sider> </n-layout-sider>
    </n-layout>
  </n-layout>
</template>