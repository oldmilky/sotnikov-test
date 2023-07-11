import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Фетчинг постов для Получения постов
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { getState }) => {
    const { postsPerPage } = getState().posts;
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_limit=${postsPerPage}`
    );
    return response.data;
  }
);

// Фетчинг комментариев для Получения комментариев к посту
export const fetchComments = createAsyncThunk(
  "posts/fetchComments",
  async postId => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    return {
      postId,
      comments: response.data,
    };
  }
);

// Фетчинг постов для Добавления поста
export const addPost = createAsyncThunk("posts/addPost", async newPost => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    newPost
  );
  return response.data;
});

// Фетчинг постов для Изменения поста
export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ postId, updatedTitle, updatedText }) => {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      { title: updatedTitle, body: updatedText }
    );
    return response.data;
  }
);

// Фетчинг постов для Удаления поста
export const deletePost = createAsyncThunk("posts/deletePost", async postId => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  return postId;
});

// Экшен для Закрытия поста
export const closeComments = createAction("comments/closeComments");

// Экшен для Установки текущей страницы и постов на странице
export const setPostsPerPage = createAction("posts/setPostsPerPage");
// Сохранение текущей страницы и постов на странице
const persistedPostsPerPage = localStorage.getItem("postsPerPage");

// Экшен для Добавления в избранное
export const toggleFavorite = createAction("posts/toggleFavorite");
// Сохранение избранных постов
export const persistFavorites = favorites => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};
export const loadFavorites = () => {
  const favoritesJSON = localStorage.getItem("favorites");
  return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};
const persistedFavorites = loadFavorites();

// Создание слайса
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    data: [],
    loading: false,
    error: null,
    comments: {},
    postsPerPage: persistedPostsPerPage ? parseInt(persistedPostsPerPage) : 10,
    favorites: persistedFavorites || [],
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // Получение постов
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.map(post => ({
          ...post,
          favorite: state.favorites.includes(post.id),
        }));
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Получение комментариев к посту
      .addCase(fetchComments.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        const { postId, comments } = action.payload;
        state.comments[postId] = comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Закрытие комментариев
      .addCase(closeComments, (state, action) => {
        const postId = action.payload;
        delete state.comments[postId];
      })

      // Добавление поста
      .addCase(addPost.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        state.data.unshift(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Изменение поста
      .addCase(editPost.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPost = action.payload;
        const index = state.data.findIndex(post => post.id === updatedPost.id);
        if (index !== -1) {
          state.data[index].title = updatedPost.title;
          state.data[index].body = updatedPost.body;
        }
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Добавление в избранное
      .addCase(toggleFavorite, (state, action) => {
        const postId = action.payload;
        const post = state.data.find(post => post.id === postId);
        if (post) {
          post.favorite = !post.favorite;
          if (post.favorite) {
            state.favorites.push(post.id);
          } else {
            state.favorites = state.favorites.filter(id => id !== post.id);
          }
          persistFavorites(state.favorites);
        }
      })

      // Удаление поста
      .addCase(deletePost.fulfilled, (state, action) => {
        const postId = action.payload;
        state.data = state.data.filter(post => post.id !== postId);
      })

      // Установка количества постов на странице
      .addCase(setPostsPerPage, (state, action) => {
        state.postsPerPage = action.payload;
        localStorage.setItem("postsPerPage", action.payload);
      });
  },
});

export default postsSlice.reducer;
