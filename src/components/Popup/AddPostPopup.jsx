import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addPost } from "../../redux/slices/postsSlice";
import "./Popup.scss";

function AddPostPopup({ isShow, setIsShow }) {
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
        <h1 className="popup__title">Добавить новый пост</h1>
        <input
          className="popup__input"
          type="text"
          name="title"
          placeholder="Введите заголовок"
          required
        />
        <textarea
          className="popup__textarea"
          name="body"
          placeholder="Введите текст"
          required
        />
        <div className="popup__wrapper">
          <button className="popup__add" type="submit">
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

AddPostPopup.propTypes = {
  isShow: PropTypes.bool.isRequired,
  setIsShow: PropTypes.func.isRequired,
};

export default AddPostPopup;
