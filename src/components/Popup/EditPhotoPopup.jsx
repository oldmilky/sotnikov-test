import PropTypes from "prop-types";
import "./Popup.scss";

function EditPhotoPopup({
  isShow,
  setIsShow,
  handleSaveClick,
  setNewTitle,
  newTitle,
}) {
  return (
    <section
      className={!isShow ? "popup" : "popup_opened"}
      onClick={() => setIsShow(false)}
    >
      <div className="popup__form" onClick={e => e.stopPropagation()}>
        <h1 className="popup__title">Редактировать задачу</h1>
        <input
          className="popup__input"
          placeholder="Задача"
          onChange={e => setNewTitle(e.target.value)}
          value={newTitle}
          type="text"
        />
        <div className="popup__wrapper">
          <button className="popup__add" onClick={handleSaveClick}>
            Сохранить изменения
          </button>
          <button className="popup__cancel" onClick={() => setIsShow(false)}>
            Отмена
          </button>
        </div>
      </div>
    </section>
  );
}

EditPhotoPopup.propTypes = {
  isShow: PropTypes.bool.isRequired,
  setIsShow: PropTypes.func.isRequired,
  handleSaveClick: PropTypes.func.isRequired,
  setNewTitle: PropTypes.func.isRequired,
  newTitle: PropTypes.string.isRequired,
};

export default EditPhotoPopup;
