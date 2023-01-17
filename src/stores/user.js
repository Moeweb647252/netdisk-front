import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: "",
      name: "",
      is_logged_In: false,
      fs_id: null,
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
      this.is_logged_In = state;
    },
    setFsId(id) {
      this.fs_id = id;
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
      return state.is_logged_In;
    },
    getFsId(state) {
      return state.fs_id;
    },
  },
  persist: {
    enabled: true,
  },
});
