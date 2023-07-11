import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import completeIcon from "../../../assets/images/complete.svg";
import completeClickIcon from "../../../assets/images/completeClick.svg";
import editIcon from "../../../assets/images/edit.svg";
import {
  toggleTaskCompletion,
  updateTaskTitle,
} from "../../../redux/slices/tasksSlice";
import EditTaskPopup from "../../Popup/EditTaskPopup";
import "./Task.scss";

function Task({ task }) {
  const dispatch = useDispatch();

  // хэндл выполненного задания
  const handleToggleCompletion = () => {
    dispatch(toggleTaskCompletion(task.id));
  };

  // изменение задания
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleSaveClick = () => {
    if (newTitle.trim() !== "") {
      dispatch(updateTaskTitle({ taskId: task.id, newTitle }));
      setIsShowEdit(false);
    }
  };

  return (
    <div className={task.completed ? "task__completed" : "task"}>
      <div className="task__container">
        <div className="task__wrap">
          <h1 className="task__name">@{task.id}</h1>
        </div>
        <div className="task__wrap">
          <img
            className="task__icon"
            onClick={handleToggleCompletion}
            src={task.completed ? completeClickIcon : completeIcon}
            alt="completeIcon"
          />
          <img
            className="task__icon"
            src={editIcon}
            alt="editIcon"
            onClick={() => setIsShowEdit(true)}
          />
        </div>
      </div>
      <h2 className={task.completed ? "task__text_completed" : "task__text"}>
        {task.title}
      </h2>
      {isShowEdit && (
        <EditTaskPopup
          isShow={isShowEdit}
          setIsShow={setIsShowEdit}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          handleSaveClick={handleSaveClick}
        />
      )}
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }),
};

export default Task;
