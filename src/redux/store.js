import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import photos from "./slices/photosSlice";
import posts from "./slices/postsSlice";
import tasks from "./slices/tasksSlice";

export const store = configureStore({
  reducer: {
    posts,
    filter,
    photos,
    tasks,
  },
});
