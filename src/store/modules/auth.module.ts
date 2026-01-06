import { handleError } from "@/utils/error";
import axios from "axios";
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
      {
        commit,
        dispatch,
      }: {
        commit: (mutation: string, payload?: any) => void;
        dispatch: (
          action: string,
          payload?: any,
          options?: { root?: boolean }
        ) => Promise<any>;
      },
      payload: any
      // credentials: LoginCredentials
    ) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`;
        const { data } = await axios.post(url, {
          ...payload,
          returnSecureToken: true,
        });
        if (!data) return null;

        const token = data.idToken; // временная заглушка
        commit("SET_TOKEN", token);
        dispatch("clearMessage", null, { root: true });

        return token;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.error(
            "Login failed:",
            handleError(error.response.data.error.message)
          );
          dispatch(
            "setMessage",
            {
              value: handleError(error.response.data.error.message),
              type: "danger",
            },
            { root: true }
          );
        } else {
          console.error("Login failed:", error);
          dispatch(
            "setMessage",
            {
              value: "Ошибка при входе в систему",
              type: "danger",
            },
            { root: true }
          );
        }
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
