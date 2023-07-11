import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addPost } from "../../redux/slices/postsSlice";
import "./Popup.scss";

function AddTaskPopup({ isShow, setIsShow, handleAddTask, setNewTaskTitle }) {
  const dispatch = useDispatch();

  const handleFormSubmit = async event => {
    event.preventDefault();

    const newPost = {
      title: event.target.title.value,
      body: event.target.body.value,
      userId: 1,
    };

    dispatch(addPost(newPost));
    event.target.reset();
    setIsShow(false);
  };

  return (
    <section
      className={!isShow ? "popup" : "popup_opened"}
      onClick={() => setIsShow(false)}
    >
      <form
        className="popup__form"
        onSubmit={handleFormSubmit}
        onClick={e => e.stopPropagation()}
      >
        <h1 className="popup__title">Добавить новую задачу</h1>
        <input
          className="popup__input"
          type="text"
          placeholder="Введите задачу"
          onChange={e => setNewTaskTitle(e.target.value)}
          required
        />
        <div className="popup__wrapper">
          <button className="popup__add" onClick={handleAddTask}>
            Добавить
          </button>
          <button className="popup__cancel" onClick={() => setIsShow(false)}>
            Отмена
          </button>
        </div>
      </form>
    </section>
  );
}

AddTaskPopup.propTypes = {
  isShow: PropTypes.bool.isRequired,
  setIsShow: PropTypes.func.isRequired,
};

export default AddTaskPopup;
