<script setup>
import { reactive } from "vue";
import { ref } from "vue";
import { WebsiteConfig } from "@/config/websiteConfig.js";
import { useUserStore } from "./stores/user";
import { useRouter } from "vue-router";

const router = useRouter();
const user = useUserStore();

if (user.getLoginState()){
 router.push("/") 
}

const loginForm = reactive({});
const loginFormRef = ref();
const websiteConfig = reactive(WebsiteConfig);
const rules = {
  username: { required: true, message: "请输入用户名", trigger: "blur" },
  password: { required: true, message: "请输入密码", trigger: "blur" },
};
const handleSubmit = async (formRef) => {
  console.log(formRef);
  formRef.validate();
};

</script>

<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-logo">
          <h1>网盘 - Nekoit</h1>
        </div>
        <div class="view-account-top-desc">网盘登录</div>
      </div>
      <div class="view-account-form">
        <n-form
          ref="loginFormRef"
          label-placement="left"
          size="large"
          :model="loginForm"
          :rules="rules"
        >
          <n-form-item path="username">
            <n-input
              v-model:value="loginForm.username"
              placeholder="请输入用户名"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <img src="./assets/UserAvatar.svg" />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="loginForm.password"
              type="password"
              showPasswordOn="click"
              placeholder="请输入密码"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <img src="./assets/Password.svg" />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item class="default-color">
            <div class="flex justify-between">
              <div class="flex-initial">
                <n-checkbox v-model:checked="autoLogin">自动登录</n-checkbox>
              </div>
            </div>
          </n-form-item>
          <n-form-item>
            <n-button
              type="primary"
              @click="handleSubmit(loginFormRef)"
              size="large"
              :loading="loading"
              block
            >
              登录
            </n-button>
          </n-form-item>
          <n-form-item>
            <n-button text tag="a" href="#" target="_blank" type="info">
              忘记密码
            </n-button>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
body {
  background-color: #f7f7f7;
}
.view-account {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;

  &-container {
    flex: 1;
    padding: 32px 12px;
    max-width: 384px;
    min-width: 320px;
    margin: 0 auto;
  }

  &-top {
    padding: 32px 0;
    text-align: center;

    &-desc {
      font-size: 14px;
      color: #808695;
    }
  }

  &-other {
    width: 100%;
  }

  .default-color {
    color: #515a6e;

    .ant-checkbox-wrapper {
      color: #515a6e;
    }
  }
}

@media (min-width: 768px) {
  .view-account {
    background-image: url("./assets/login.svg");
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%;
  }

  .page-account-container {
    padding: 32px 0 24px 0;
  }
}
</style>
