import { defineStore } from "pinia";
import { useAuthStore } from "./auth.store";
import { useAppStore } from "./app.store";
import axios from "../axios/request";

interface RequestState {
  requests: any[]; // AxiosPromise<any>[]
}

export const useRequestStore = defineStore("request", {
  state: (): RequestState => ({
    requests: [],
  }),
  actions: {
    setRequests(requests: any[]) {
      this.requests = requests;
    },
    addRequest(request: any) {
      this.requests.push(request);
    },
    async create(payload: any) {
      const authStore = useAuthStore();
      const appStore = useAppStore();

      try {
        const token = authStore.token;
        const url = `/requests.json?auth=${token}`;
        const { data } = await axios.post(url, payload);
        this.addRequest({ ...payload, id: data.name });
        appStore.setMessage({
          value: "Заявка создана",
          type: "success",
        });
      } catch (error) {
        console.dir(error);
        appStore.setMessage({
          value:
            error instanceof Error
              ? error.message
              : "Произошла неизвестная ошибка",
          type: "danger",
        });
      }
    },
    async load() {
      const authStore = useAuthStore();
      const appStore = useAppStore();
      try {
        const token = authStore.token;
        const url = `/requests.json?auth=${token}`;
        const { data } = await axios.get(url);
        const requests = Object.keys(data).map((id) => ({ ...data[id], id }));
        this.setRequests(requests);
      } catch (error) {
        console.dir(error);
        appStore.setMessage({
          value:
            error instanceof Error
              ? error.message
              : "Произошла неизвестная ошибка",
          type: "danger",
        });
      }
    },
    async loadById(id: string) {
      const authStore = useAuthStore();
      const appStore = useAppStore();
      try {
        const token = authStore.token;
        const url = `/requests/${id}.json?auth=${token}`;
        const { data } = await axios.get(url);
        return data;
      } catch (error) {
        appStore.setMessage({
          value:
            error instanceof Error
              ? error.message
              : "Произошла неизвестная ошибка",
          type: "danger",
        });
      }
    },
    async remove(id: string) {
      const authStore = useAuthStore();
      const appStore = useAppStore();
      try {
        const token = authStore.token;
        const url = `/requests/${id}.json?auth=${token}`;
        await axios.delete(url);
        appStore.setMessage({
          value: "Заявка удалена",
          type: "success",
        });
      } catch (error) {
        appStore.setMessage({
          value:
            error instanceof Error
              ? error.message
              : "Произошла неизвестная ошибка",
          type: "danger",
        });
      }
    },
    async update(request: any) {
      const authStore = useAuthStore();
      const appStore = useAppStore();

      try {
        const token = authStore.token;
        const url = `/requests/${request.id}.json?auth=${token}`;
        await axios.put(url, request);
        appStore.setMessage({
          value: "Заявка обновлена",
          type: "success",
        });
      } catch (error) {
        appStore.setMessage({
          value:
            error instanceof Error
              ? error.message
              : "Произошла неизвестная ошибка",
          type: "danger",
        });
      }
    },
  },
});
