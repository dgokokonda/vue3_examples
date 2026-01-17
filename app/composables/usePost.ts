interface PostType {
  id: string;
  title: string;
  content: string;
}

export const usePost = () => {
  const route = useRoute();
  const postId = route.params.id as string;
  const posts = useState<PostType[]>("posts", () => []);
  const post = useState<PostType>("post", () => ({
    id: "",
    title: "",
    content: "",
  }));

  const getPosts = async () => {
    const { data, error } = await useFetch<PostType[]>(
      "http://localhost:3001/posts",
    );

    if (data.value) {
      posts.value = data.value;
    }
    return posts;
  };

  const getPost = async () => {
    if (!postId) return post;
    const { data, error } = await useFetch<PostType>(
      `http://localhost:3001/posts/${postId}`,
      {
        key: `post-${postId}`,
      },
    );
    if (data.value) post.value = data.value;
    return post;
  };

  const addPost = async (post: Omit<PostType, "id">) => {
    try {
      const res = await $fetch<PostType>("http://localhost:3001/posts", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await getPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (postId: string) => {
    await $fetch(`http://localhost:3001/posts/${postId}`, {
      method: "DELETE",
    });

    // await getPosts();
    posts.value = posts.value.filter(({ id }) => id !== postId);
  };

  const editPost = async () => {
    if (!postId) return;
    await $fetch<PostType>(`http://localhost:3001/posts/${postId}`, {
      method: "PATCH",
      body: JSON.stringify(post.value),
    });
  };

  return {
    posts: readonly(posts),
    getPosts,
    getPost,
    addPost,
    deletePost,
    editPost,
  };
};
