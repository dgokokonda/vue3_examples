import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: "http://localhost:3001",
  });

  nuxtApp.provide("api", api);

  nuxtApp.provide("apiClient", {
    getPosts: () => api.get("/posts").then((res) => res.data),
    getPostsAsync: () => {
      return useAsyncData("posts", () =>
        api.get("/posts").then((res) => res.data),
      );
    },

    getPost: (id: string) => api.get(`/posts/${id}`).then((res) => res.data),
    createPost: (data: any) => api.post("/posts", data).then((res) => res.data),
    updatePost: (id: string, data: any) =>
      api.patch(`/posts/${id}`, data).then((res) => res.data),
    deletePost: (id: string) =>
      api.delete(`/posts/${id}`).then((res) => res.data),
  });
});
