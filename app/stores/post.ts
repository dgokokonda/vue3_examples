interface PostType {
  id: string;
  title: string;
  content: string;
}

interface PostsState {
  posts: PostType[];
  post: Partial<PostType>;
}

export const usePostStore = defineStore("postStore", {
  state(): PostsState {
    return {
      posts: [],
      post: {},
    };
  },
  actions: {
    async getPosts() {
      const { data, error } = await useFetch<PostType[]>(
        "http://localhost:3001/posts",
      );

      if (data.value) {
        this.posts = data.value;
      }
    },
    async getPost(route: { params: { id: string } } | undefined) {
      if (!route?.params.id) return this.post;
      const { data, error } = await useFetch<PostType>(
        `http://localhost:3001/posts/${route.params.id}`,
        {
          key: `post-${route.params.id}`,
        },
      );
      if (data.value) this.post = data.value;
    },
    async addPost() {
      try {
        const res = await $fetch<PostType>("http://localhost:3001/posts", {
          method: "POST",
          body: JSON.stringify(this.post),
          headers: {
            "Content-Type": "application/json",
          },
        });
        this.post = {};
      } catch (error) {
        console.error(error);
      }
    },

    async editPost() {
      if (!this.post.id) return;
      await $fetch<PostType>(`http://localhost:3001/posts/${this.post.id}`, {
        method: "PATCH",
        body: JSON.stringify(this.post),
      });
    },
    async deletePost(postId: string) {
      await $fetch(`http://localhost:3001/posts/${postId}`, {
        method: "DELETE",
      });

      this.posts = this.posts.filter(({ id }) => id !== postId);
    },
  },
});
