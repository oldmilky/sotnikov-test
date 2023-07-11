import PropTypes from "prop-types";
import "./Popup.scss";

function FullPhotoPopup({ isShow, setIsShow, photoUrl }) {
  return (
    <section
      className={!isShow ? "popup" : "popup_opened"}
      onClick={() => setIsShow(false)}
    >
      <img
        className="popup__img"
        src={photoUrl}
        alt="Photo"
        onClick={e => e.stopPropagation()}
      />
    </section>
  );
}

FullPhotoPopup.propTypes = {
  isShow: PropTypes.bool.isRequired,
  setIsShow: PropTypes.func.isRequired,
  photoUrl: PropTypes.string.isRequired,
};

export default FullPhotoPopup;
