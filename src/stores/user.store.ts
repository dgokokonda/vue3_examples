import { defineStore } from "pinia";

interface RootState {
  loggedIn: boolean;
  userInfo: string | null;
}

export const useUserStore = defineStore("user", {
  state: (): RootState => ({
    loggedIn: false,
    userInfo: null,
  }),
  actions: {
    login(userInfo: string) {
      this.loggedIn = true;
      this.userInfo = userInfo;
    },
    logout() {
      this.loggedIn = false;
      this.userInfo = null;
    },
  },
});
