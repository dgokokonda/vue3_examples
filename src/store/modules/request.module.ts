import store from "../index";
import axios from "../../axios/request";

interface RequestState {
  requests: any[]; // AxiosPromise<any>[]
}

export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  getters: {
    requests(state: RequestState) {
      return state.requests;
    },
  },
  mutations: {
    setRequests(state: RequestState, requests: any[]) {
      state.requests = requests;
    },
    addRequest(state: RequestState, request: any) {
      state.requests.push(request);
    },
  },
  actions: {
    async create(
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
    ) {
      try {
        const token = store.getters["auth/token"];
        const url = `/requests.json?auth=${token}`;
        const { data } = await axios.post(url, payload);
        commit("addRequest", { ...payload, id: data.name });
        dispatch(
          "setMessage",
          {
            value: "Заявка создана",
            type: "success",
          },
          { root: true }
        );
      } catch (error) {
        console.dir(error);
        dispatch(
          "setMessage",
          {
            value:
              error instanceof Error
                ? error.message
                : "Произошла неизвестная ошибка",
            type: "danger",
          },
          { root: true }
        );
      }
    },
    async load(
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
      }
      // payload: any
    ) {
      try {
        const token = store.getters["auth/token"];
        const url = `/requests.json?auth=${token}`;
        const { data } = await axios.get(url);
        const requests = Object.keys(data).map((id) => ({ ...data[id], id }));
        commit("setRequests", requests);
      } catch (error) {
        console.dir(error);
        dispatch(
          "setMessage",
          {
            value: error,
            type: "danger",
          },
          { root: true }
        );
      }
    },
    async loadById(
      {
        dispatch,
      }: {
        dispatch: (
          action: string,
          payload?: any,
          options?: { root?: boolean }
        ) => Promise<any>;
      },
      id: string
    ) {
      try {
        const token = store.getters["auth/token"];
        const url = `/requests/${id}.json?auth=${token}`;
        const { data } = await axios.get(url);
        return data;
      } catch (error) {
        dispatch(
          "setMessage",
          {
            value: error,
            type: "danger",
          },
          { root: true }
        );
      }
    },
    async remove(
      {
        dispatch,
      }: {
        dispatch: (
          action: string,
          payload?: any,
          options?: { root?: boolean }
        ) => Promise<any>;
      },
      id: string
    ) {
      try {
        const token = store.getters["auth/token"];
        const url = `/requests/${id}.json?auth=${token}`;
        await axios.delete(url);
        dispatch(
          "setMessage",
          {
            value: "Заявка удалена",
            type: "success",
          },
          { root: true }
        );
      } catch (error) {
        dispatch(
          "setMessage",
          {
            value:
              error instanceof Error
                ? error.message
                : "Произошла неизвестная ошибка",
            type: "danger",
          },
          { root: true }
        );
      }
    },
    async update(
      {
        dispatch,
      }: {
        dispatch: (
          action: string,
          payload?: any,
          options?: { root?: boolean }
        ) => Promise<any>;
      },
      request: any
    ) {
      try {
        const token = store.getters["auth/token"];
        const url = `/requests/${request.id}.json?auth=${token}`;
        await axios.put(url, request);
        dispatch(
          "setMessage",
          {
            value: "Заявка обновлена",
            type: "success",
          },
          { root: true }
        );
      } catch (error) {
        dispatch(
          "setMessage",
          {
            value:
              error instanceof Error
                ? error.message
                : "Произошла неизвестная ошибка",
            type: "danger",
          },
          { root: true }
        );
      }
    },
  },
};
