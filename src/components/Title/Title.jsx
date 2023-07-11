import PropTypes from "prop-types";
import deleteIcon from "../../assets/images/deleteInactive.svg";
import "./Title.scss";

function Title({
  title,
  setIsShow,
  titleButton,
  deleteAllButton,
  setIsShowDelete,
}) {
  return (
    <div className="title">
      <h1 className="title__title">
        {title} <span className="title__span">@1-100</span>
      </h1>
      <div className="title__wrap">
        {titleButton && (
          <button className="title__button" onClick={setIsShow}>
            {titleButton}
          </button>
        )}
        {deleteAllButton && (
          <button
            className="title__button_delete"
            onClick={setIsShowDelete}
          >
            <img className="title__button_delete-img" src={deleteIcon} alt="deleteIcon" />
          </button>
        )}
      </div>
    </div>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  titleButton: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  setIsShow: PropTypes.oneOfType([PropTypes.func.isRequired, PropTypes.node]),
  deleteAllButton: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.node,
  ]),
  setIsShowDelete: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.node,
  ])
};

export default Title;
