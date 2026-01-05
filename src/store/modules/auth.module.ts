// store/modules/auth.module.ts
const JWT_TOKEN = "jwt-token";

interface AuthState {
  token: string | null;
}

interface RootState {
  // другие модули...
}

interface LoginCredentials {
  email: string;
  password: string;
}

const authModule = {
  namespaced: true,

  state: (): AuthState => ({
    token: localStorage.getItem(JWT_TOKEN) || null,
  }),

  getters: {
    token(state: AuthState): string | null {
      return state.token;
    },
    isAuthenticated(
      _state: AuthState,
      getters: { token: string | null }
    ): boolean {
      return !!getters.token;
    },
  },

  mutations: {
    SET_TOKEN(state: AuthState, token: string) {
      state.token = token;
      localStorage.setItem(JWT_TOKEN, token);
    },
    LOGOUT(state: AuthState) {
      console.log("logout");
      state.token = null;
      localStorage.removeItem(JWT_TOKEN);
    },
  },

  actions: {
    async login(
      { commit }: { commit: (mutation: string, payload?: any) => void },
      credentials: LoginCredentials
    ) {
      try {
        // Здесь будет реальный API запрос
        // const response = await api.login(credentials);
        // const token = response.data.token;

        const token = "some-jwt-token"; // временная заглушка
        commit("SET_TOKEN", token);
        return token;
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },

    logout({ commit }: { commit: (mutation: string) => void }) {
      commit("LOGOUT");
    },

    async checkAuth({
      commit,
      state,
    }: {
      commit: (mutation: string, payload?: any) => void;
      state: AuthState;
    }) {
      const token = localStorage.getItem(JWT_TOKEN);
      if (token && !state.token) {
        commit("SET_TOKEN", token);
      }
    },

    async loginAndFetchData(
      {
        dispatch,
      }: {
        dispatch: (
          action: string,
          payload?: any,
          options?: any
        ) => Promise<any>;
      },
      credentials: LoginCredentials
    ) {
      const token = await dispatch("login", credentials, { root: false });
      // await dispatch("fetchUserData", token);
      return token;
    },
  },
};

export default authModule;
