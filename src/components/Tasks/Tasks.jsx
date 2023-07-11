import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteAllTasks,
  fetchTasks,
  setTasksPerPage,
} from "../../redux/slices/tasksSlice";
import Filter from "../Filter/Filter";
import Loader from "../Loader/Loader";
import AddTaskPopup from "../Popup/AddTaskPopup";
import DeletePopup from "../Popup/DeletePopup";
import Quality from "../Quality/Quality";
import Title from "../Title/Title";
import Task from "./Task/Task";
import "./Tasks.scss";

function Tasks() {
  const dispatch = useDispatch();
  const uncompletedTasks = useSelector(state => state.tasks.uncompleted);
  const completedTasks = useSelector(state => state.tasks.completed);
  const loading = useSelector(state => state.tasks.loading);
  const error = useSelector(state => state.tasks.error);
  const tasksPerPage = useSelector(state => state.tasks.tasksPerPage);
  const isAllTasksDeleted = useSelector(state => state.tasks.isAllTasksDeleted);

  // Получение фото
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch, tasksPerPage]);

  // хэндл изменения количества постов на странице
  const handleTasksPerPageChange = value => {
    dispatch(setTasksPerPage(value));
  };

  // хэндл нового поста
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = () => {
    if (newTaskTitle) {
      dispatch(addTask(newTaskTitle));
      setNewTaskTitle("");
    }
    setIsShowAdd(false);
  };

  // хэндл всех постов
  const [isShowDelete, setIsShowDelete] = useState(false);

  const handleDeleteAllClick = () => {
    dispatch(deleteAllTasks());
    setIsShowDelete(false);
  };

  // хэндл показывать только невыполненные
  const [showUncompletedOnly, setShowUncompletedOnly] = useState(false);

  const handleToggleUncompletedOnly = () => {
    setShowUncompletedOnly(prevState => !prevState);
  };

  // поиск по названию
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Title
        title="Задачи пользователей"
        titleButton="Добавить задачу"
        deleteAllButton="Удалить все посты"
        setIsShowDelete={setIsShowDelete}
        setIsShow={() => setIsShowAdd(true)}
      />
      <Quality
        value={tasksPerPage}
        handle={handleTasksPerPageChange}
        data={uncompletedTasks && completedTasks}
        title="задач"
      />
      <section className="tasks">
        <Filter
          value={searchQuery}
          setter={setSearchQuery}
          checked={showUncompletedOnly}
          handle={handleToggleUncompletedOnly}
          title="невыполненные"
        />
        <h1 className="tasks__title">Невыполненные задачи:</h1>
        <div className="tasks__container">
          {error ? (
            <div> errorka :c {error}</div>
          ) : (
            <>
              {loading ? (
                <>
                  <Loader />
                  <Loader />
                  <Loader />
                </>
              ) : (
                <>
                  {isAllTasksDeleted ? (
                    <p className="tasks__text">
                      Задач на данный момент нет, либо они были удалены. ಠ_ಠ
                    </p>
                  ) : (
                    <>
                      {uncompletedTasks
                        .filter(
                          task =>
                            task.title.includes(searchQuery) &&
                            (!showUncompletedOnly || !task.completed)
                        )
                        .map(task => (
                          <Task key={task.id} task={task} />
                        ))}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>

        <h1 className="tasks__title">Выполненные задачи:</h1>
        <div className="tasks__container">
          {error ? (
            <div> errorka :c {error}</div>
          ) : (
            <>
              {loading ? (
                <>
                  <Loader />
                  <Loader />
                  <Loader />
                </>
              ) : (
                <>
                  {isAllTasksDeleted ? (
                    <p className="tasks__text">
                      Задач на данный момент нет, либо они были удалены. ಠ_ಠ
                    </p>
                  ) : (
                    <>
                      {completedTasks
                        .filter(
                          task =>
                            task.title.includes(searchQuery) &&
                            (!showUncompletedOnly || !task.completed)
                        )
                        .map(task => (
                          <Task key={task.id} task={task} />
                        ))}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
        {isShowAdd && (
          <AddTaskPopup
            isShow={isShowAdd}
            setIsShow={setIsShowAdd}
            handleAddTask={handleAddTask}
            setNewTaskTitle={setNewTaskTitle}
          />
        )}
        {isShowDelete && (
          <DeletePopup
            title="все посты"
            isShow={isShowDelete}
            setIsShow={setIsShowDelete}
            handleDelete={handleDeleteAllClick}
          />
        )}
      </section>
    </>
  );
}

export default Tasks;
