import { defineStore } from "pinia";
import { handleError } from "@/utils/error";
import type { AuthState, LoginCredentials } from "./types/auth";
import axios from "axios";
import { useAppStore } from "./app.store";

const JWT_TOKEN = "jwt-token";

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: localStorage.getItem(JWT_TOKEN) || null,
  }),

  getters: {
    // в Options API Pinia не нужно использовать computed() внутри геттеров
    isAuthenticated(state: AuthState): boolean {
      return !!state.token;
    },
  },
  actions: {
    setToken(token: string) {
      if (!token) return;
      this.token = token;
      localStorage.setItem(JWT_TOKEN, token);
    },
    //  В Pinia нет мутаций и специального контекста commit/dispatch
    async login(payload: LoginCredentials) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`;
        const { data } = await axios.post(url, {
          ...payload,
          returnSecureToken: true,
        });
        if (!data) return null;

        const token = data.idToken; // временная заглушка
        this.setToken(token);

        const appStore = useAppStore();
        appStore.clearMessage();

        return token;
      } catch (error) {
        const appStore = useAppStore();

        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = handleError(error.response.data.error.message);
          console.error(
            "Login failed:",
            handleError(error.response.data.error.message)
          );
          appStore.setMessage({
            value: errorMessage,
            type: "danger",
          });
        } else {
          console.error("Login failed:", error);
          appStore.setMessage({
            value: "Ошибка при входе в систему",
            type: "danger",
          });
        }
        throw error;
      }
    },

    logout() {
      console.log("logout");
      this.token = null;
      localStorage.removeItem(JWT_TOKEN);
    },

    async checkAuth() {
      const token = localStorage.getItem(JWT_TOKEN);
      if (token && !this.token) {
        this.setToken(token);
      }
    },

    async loginAndFetchData(credentials: LoginCredentials) {
      const token = await this.login(credentials);
      // await this.fetchUserData(token);
      return token;
    },
    async register(payload: LoginCredentials) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`;
        const { data } = await axios.post(url, {
          ...payload,
          returnSecureToken: true,
        });
        if (!data) return null;
        const token = data.idToken; // временная заглушка
        this.setToken(token);
        const appStore = useAppStore();
        appStore.clearMessage();
        return token;
      } catch (error) {
        const appStore = useAppStore();
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = handleError(error.response.data.error.message);
          console.error(
            "Login failed:",
            handleError(error.response.data.error.message)
          );
          appStore.setMessage({
            value: errorMessage,
            type: "danger",
          });
        } else {
          console.error("Login failed:", error);
          appStore.setMessage({
            value: "Ошибка при входе в систему",
            type: "danger",
          });
        }
        throw error;
      }
    },
  },
});
