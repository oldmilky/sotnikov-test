import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Фетчинг заданий
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { getState }) => {
    const { tasksPerPage } = getState().tasks;
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_&_limit=${tasksPerPage}`
    );
    return response.data;
  }
);

// Фетчинг переключения заданий
export const toggleTaskCompletion = createAsyncThunk(
  "tasks/toggleTaskCompletion",
  async (taskId, { getState }) => {
    const { tasks } = getState();
    const task = tasks.data.find(task => task.id === taskId);
    if (task) {
      const updatedTask = { ...task, completed: !task.completed };
      await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${taskId}`,
        updatedTask
      );
      return updatedTask;
    }
  }
);

// Фетчинг редактирования заданий
export const updateTaskTitle = createAsyncThunk(
  "tasks/updateTaskTitle",
  async ({ taskId, newTitle }, { getState }) => {
    const { tasks } = getState();
    const task = tasks.data.find(task => task.id === taskId);
    if (task) {
      const updatedTask = { ...task, title: newTitle };
      await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${taskId}`,
        updatedTask
      );
      return updatedTask;
    }
  }
);

// Экшн добавления задачи
export const addTask = createAction("tasks/addTask");

// Экшн удаления всех задач
export const deleteAllTasks = createAction("tasks/deleteAllTasks");

// Экшен для Установки текущей страницы и постов на странице
export const setTasksPerPage = createAction("tasks/setTasksPerPage");
// Сохранение текущей страницы и постов на странице
const persistedTasksPerPage = localStorage.getItem("tasksPerPage");



const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    data: [],
    uncompleted: [],
    completed: [],
    loading: false,
    error: null,
    tasksPerPage: persistedTasksPerPage ? parseInt(persistedTasksPerPage) : 10,
    isAllTasksDeleted: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // Получение задач
      .addCase(fetchTasks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.uncompleted = action.payload.filter(task => !task.completed);
        state.completed = action.payload.filter(task => task.completed);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Переключение задач
      .addCase(toggleTaskCompletion.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const taskIndex = state.data.findIndex(
          task => task.id === updatedTask.id
        );
        if (taskIndex !== -1) {
          state.data[taskIndex] = updatedTask;
          if (updatedTask.completed) {
            // Задачи в невыполненные
            state.uncompleted = state.uncompleted.filter(
              task => task.id !== updatedTask.id
            );
            state.completed.unshift(updatedTask);
          } else {
            // Задачи в выполненные
            state.completed = state.completed.filter(
              task => task.id !== updatedTask.id
            );
            state.uncompleted.unshift(updatedTask);
          }
        }
      })
      // Редактирование задач
      .addCase(updateTaskTitle.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const taskIndex = state.data.findIndex(
          task => task.id === updatedTask.id
        );
        if (taskIndex !== -1) {
          state.data[taskIndex] = updatedTask;
          if (updatedTask.completed) {
            const completedTaskIndex = state.completed.findIndex(
              task => task.id === updatedTask.id
            );
            if (completedTaskIndex !== -1) {
              state.completed[completedTaskIndex] = updatedTask;
            }
          } else {
            const uncompletedTaskIndex = state.uncompleted.findIndex(
              task => task.id === updatedTask.id
            );
            if (uncompletedTaskIndex !== -1) {
              state.uncompleted[uncompletedTaskIndex] = updatedTask;
            }
          }
        }
      })
      // Добавление задачи
      .addCase(addTask, (state, action) => {
        const newTask = {
          id: state.data.length + 1,
          title: action.payload,
          completed: false,
        };
        state.data.unshift(newTask);
        state.uncompleted.unshift(newTask);
      })
      // Удаление всех задач
      .addCase(deleteAllTasks, state => {
        state.data = [];
        state.uncompleted = [];
        state.completed = [];
        state.isAllTasksDeleted = true;
      })
      // Установка количества фотографий на странице
      .addCase(setTasksPerPage, (state, action) => {
        state.tasksPerPage = action.payload;
        localStorage.setItem("tasksPerPage", action.payload);
      });
  },
});

export default tasksSlice.reducer;
