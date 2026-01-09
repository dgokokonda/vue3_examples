interface RootState {
  loggedIn: boolean;
  userInfo: string | null;
}

export default {
  state: () => ({
    loggedIn: false,
    userInfo: null,
  }),
  mutations: {
    login(state: RootState, userInfo: string) {
      state.loggedIn = true;
      state.userInfo = userInfo;
    },
    logout(state: RootState) {
      state.loggedIn = false;
      state.userInfo = null;
    },
  },
};
