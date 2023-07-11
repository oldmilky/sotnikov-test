import PropTypes from "prop-types";
import "./Popup.scss";

function DeletePopup({ title, isShow, setIsShow, handleDelete }) {
  return (
    <section
      className={!isShow ? "popup" : "popup_opened"}
      onClick={() => setIsShow(false)}
    >
      <div className="popup__form" onClick={e => e.stopPropagation()}>
        <h1 className="popup__title">Вы уверены что хотите удалить {title}?</h1>
        <div className="popup__wrapper">
          <button className="popup__add" onClick={handleDelete}>
            Удалить
          </button>
          <button className="popup__cancel" onClick={() => setIsShow(false)}>
            Отмена
          </button>
        </div>
      </div>
    </section>
  );
}

DeletePopup.propTypes = {
  title: PropTypes.string.isRequired,
  isShow: PropTypes.bool.isRequired,
  setIsShow: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default DeletePopup;
