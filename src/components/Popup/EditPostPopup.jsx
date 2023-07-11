import PropTypes from "prop-types";
import "./Popup.scss";

function EditPostPopup({ isShow, setIsShow, handleEditSubmit }) {
  return (
    <section
      className={!isShow ? "popup" : "popup_opened"}
      onClick={() => setIsShow(false)}
    >
      <form
        className="popup__form"
        onSubmit={handleEditSubmit}
        onClick={e => e.stopPropagation()}
      >
        <h1 className="popup__title">Редактировать профиль</h1>
        <input className="popup__input" name="title" placeholder="Заголовок" />
        <textarea
          className="popup__textarea"
          name="body"
          placeholder="Редактировать текст"
          required
        />
        <div className="popup__wrapper">
          <button className="popup__add" type="submit">
            Сохранить изменения
          </button>
          <button className="popup__cancel" onClick={() => setIsShow(false)}>
            Отмена
          </button>
        </div>
      </form>
    </section>
  );
}

EditPostPopup.propTypes = {
  isShow: PropTypes.bool.isRequired,
  setIsShow: PropTypes.func.isRequired,
  handleEditSubmit: PropTypes.func.isRequired,
};

export default EditPostPopup;
