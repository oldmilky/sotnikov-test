import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PhotosPage from "./pages/PhotosPage";
import PostPage from "./pages/PostsPage";
import TasksPage from "./pages/TasksPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostPage />} />
        <Route path="/photos" element={<PhotosPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
