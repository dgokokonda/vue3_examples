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
            value: error,
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
      },
      payload: any
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
  },
};
