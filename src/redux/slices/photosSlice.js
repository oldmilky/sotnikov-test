import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Фетчинг фото
export const fetchPhotos = createAsyncThunk(
  "photos/fetchPhotos",
  async (_, { getState }) => {
    const { photosPerPage } = getState().photos;
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?_&_limit=${photosPerPage}`
    );
    return response.data;
  }
);

// Фетчинг редактирования фото
export const updatePhotoTitle = createAsyncThunk(
  "photos/updatePhotoTitle",
  async ({ photoId, newTitle }, { getState }) => {
    const { photos } = getState();
    const photo = photos.data.find(photo => photo.id === photoId);
    if (photo) {
      const updatedPhoto = { ...photo, title: newTitle };
      await axios.put(
        `https://jsonplaceholder.typicode.com/photos/${photoId}`,
        updatedPhoto
      );
      return updatedPhoto;
    }
  }
);

// Фетчинг постов для Удаления поста
export const deletePhoto = createAsyncThunk(
  "photos/deletePhoto",
  async photoId => {
    await axios.delete(
      `https://jsonplaceholder.typicode.com/photos/${photoId}`
    );
    return photoId;
  }
);

// Экшен для Установки текущей страницы и постов на странице
export const setPhotosPerPage = createAction("photos/setPhotosPerPage");
// Сохранение текущей страницы и постов на странице
const persistedPhotosPerPage = localStorage.getItem("photosPerPage");

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



const photosSlice = createSlice({
  name: "photos",
  initialState: {
    data: [],
    loading: false,
    error: null,
    photosPerPage: persistedPhotosPerPage
      ? parseInt(persistedPhotosPerPage)
      : 10,
    favorites: persistedFavorites || [],
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // Получение фото
      .addCase(fetchPhotos.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.map(photo => ({
          ...photo,
          favorite: state.favorites.includes(photo.id),
        }));
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Установка количества фотографий на странице
      .addCase(setPhotosPerPage, (state, action) => {
        state.photosPerPage = action.payload;
        localStorage.setItem("photosPerPage", action.payload);
      })
      // Редактирование фото
      .addCase(updatePhotoTitle.fulfilled, (state, action) => {
        const updatedPhoto = action.payload;
        const photoIndex = state.data.findIndex(
          task => task.id === updatedPhoto.id
        );
        if (photoIndex !== -1) {
          state.data[photoIndex] = updatedPhoto;
          const completedPhotoIndex = state.data.findIndex(
            task => task.id === updatedPhoto.id
          );
          if (completedPhotoIndex !== -1) {
            state.data[completedPhotoIndex] = updatedPhoto;
          }
        }
      })
      // Добавление в избранное
      .addCase(toggleFavorite, (state, action) => {
        const photoId = action.payload;
        const photo = state.data.find(photo => photo.id === photoId);
        if (photo) {
          photo.favorite = !photo.favorite;
          if (photo.favorite) {
            state.favorites.push(photo.id);
          } else {
            state.favorites = state.favorites.filter(id => id !== photo.id);
          }
          persistFavorites(state.favorites);
        }
      })
      // Удаление фото
      .addCase(deletePhoto.fulfilled, (state, action) => {
        const photoId = action.payload;
        state.data = state.data.filter(photo => photo.id !== photoId);
      });
  },
});

export default photosSlice.reducer;
