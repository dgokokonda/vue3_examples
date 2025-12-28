export default {
  state: () => ({
    loggedIn: false,
    userInfo: null,
  }),
  mutations: {
    login(state: object, userInfo: object) {
      state.loggedIn = true;
      state.userInfo = userInfo;
    },
    logout(state: object) {
      state.loggedIn = false;
      state.userInfo = null;
    },
  },
};
