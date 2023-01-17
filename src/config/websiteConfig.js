const apiAddr = "http://127.0.0.1:8000/api/";
export const WebsiteConfig = {
  apiAddr: apiAddr,
  apis: {
    userSetSelfInfo: apiAddr + "user/setSelfInfo",
    userSetInfo: apiAddr + "user/setInfo",
    userGetInfo: apiAddr + "user/getInfo",
    userLogin: apiAddr + "user/login",
    groupAddUser: apiAddr + "group/addUser",
    groupRemoveUser: apiAddr + "group/removeUser",
    groupGetInfo: apiAddr + "group/getInfo",
    groupSetInfo: apiAddr + "group/setInfo",
    fsListDir: apiAddr + "fs/listDir",
    fsAllPaste: apiAddr + "fs/paste",
    fsDownloadToken: apiAddr + "fs/downloadToken",
    
  },
  downloadAddr: "http://127.0.0.1:8000/api/download",
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
