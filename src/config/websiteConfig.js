const apiAddr = "http://127.0.0.1:8000/api/";
export const WebsiteConfig = {
  apiAddr: apiAddr,
  apis: {
    userInfo: apiAddr + "user/info",
    userSetInfo: apiAddr + "user/setinfo",
    userLogin: apiAddr + "user/login",
    fsHostFiles: apiAddr + "fs/host/files",
    fsShareFiles: apiAddr + "fs/share/files",
    fsUserFiles: apiAddr + "fs/user/files",
    fsAllPaste: apiAddr + "fs/all/paste"
  },
  errors: {
    2000: {
      cn: "出错了~",
    },
    2001: {
      cn: "出错了~",
    },
    2101: {
      cn: "文件或目录不存在!",
    },
    2201: {
      cn: "权限不足!",
    },
    2202: {
      cn: "未登录!",
    },
    2203: {
      cn: "账号和密码不正确!",
    },
  },
};
