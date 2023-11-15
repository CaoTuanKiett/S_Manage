import { defineStore } from "pinia";

export const userInfo = defineStore({
  id: "userInfo",
  state: () => ({
    userInfo: null,
  }),
  actions: {
    setUserInfo() {
      const accessToken = localStorage.getItem("accessToken");
      const base64Url = accessToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      const user = JSON.parse(jsonPayload);
      this.userInfo = user;
    },
  },
});
