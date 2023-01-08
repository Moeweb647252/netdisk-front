import { getTransitionName } from "ant-design-vue/lib/_util/transition";
import { defineStore } from "pinia";

export const useUserStore = defineStore("counter", {
  state: () => {
    return {
      token: "",
      name: "",
      isLoggedIn: false,
    };
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    setToken(token) {
      this.token = token;
    },
    setName(name) {
      this.name = name;
    },
    setLoginState(state) {
      this.isLoggedIn = state;
    },
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getName(state) {
      return state.name;
    },
    getLoginState(state) {
      return state.isLoggedIn;
    },
  },
  persist: {
    enabled: true
  }
});
