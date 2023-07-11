import { PropTypes } from "prop-types";
import { NavLink } from "react-router-dom";
import photosIcon from "../../assets/images/photos.svg";
import photosActiveIcon from "../../assets/images/photosActive.svg";
import postsIcon from "../../assets/images/posts.svg";
import postsActiveIcon from "../../assets/images/postsActive.svg";
import tasksIcon from "../../assets/images/tasks.svg";
import tasksActiveIcon from "../../assets/images/tasksActive.svg";
import "./Popup.scss";

function BurgerMenu({ isShow, setIsShow }) {

  return (
    <div
      className={!isShow ? "popup" : "popup_opened"}
      onClick={() => setIsShow(false)}
    >
      <div className="burger__container" onClick={e => e.stopPropagation()}>
        <NavLink className="header__link" to="/">
          <div className="header__wrapper">
            <img
              className="header__icon"
              src={location.pathname === "/" ? postsActiveIcon : postsIcon}
              alt="postsIcon"
            />
            <h1
              className={
                location.pathname === "/"
                  ? "header__title_active"
                  : "header__title"
              }
            >
              Посты
            </h1>
          </div>
        </NavLink>
        <NavLink className="header__link" to="/photos">
          <div className="header__wrapper">
            <img
              className="header__icon"
              src={
                location.pathname === "/photos" ? photosActiveIcon : photosIcon
              }
              alt="photosIcon"
            />
            <h1
              className={
                location.pathname === "/photos"
                  ? "header__title_active"
                  : "header__title"
              }
            >
              Фото
            </h1>
          </div>
        </NavLink>
        <NavLink className="header__link" to="/tasks">
          <div className="header__wrapper">
            <img
              className="header__icon"
              src={location.pathname === "/tasks" ? tasksActiveIcon : tasksIcon}
              alt="photosIcon"
            />
            <h1
              className={
                location.pathname === "/tasks"
                  ? "header__title_active"
                  : "header__title"
              }
            >
              Задачи
            </h1>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

BurgerMenu.propTypes = {
  isShow: PropTypes.bool.isRequired,
  setIsShow: PropTypes.func.isRequired,
};

export default BurgerMenu;
