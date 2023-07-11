import { useState } from "react";
import { NavLink } from "react-router-dom";
import photosIcon from "../../assets/images/photos.svg";
import photosActiveIcon from "../../assets/images/photosActive.svg";
import postsIcon from "../../assets/images/posts.svg";
import postsActiveIcon from "../../assets/images/postsActive.svg";
import logo from "../../assets/images/sotnikov.svg";
import tasksIcon from "../../assets/images/tasks.svg";
import tasksActiveIcon from "../../assets/images/tasksActive.svg";
import BurgerMenu from "../Popup/BurgerMenu";
import "./Header.scss";

function Header() {

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  return (
    <header className="header">
      <NavLink className="header__link" to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </NavLink>
      <div className="header__container">
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

      {/* Бургер меню */}
      
      <div className="header__burger" onClick={() => setIsBurgerOpen(true)}>
        <div className="header__burger-line" />
        <div className="header__burger-line" />
        <div className="header__burger-line" />
      </div>
      {isBurgerOpen && (
        <BurgerMenu isShow={isBurgerOpen} setIsShow={setIsBurgerOpen} />
      )}
      
    </header>
  );
}

export default Header;
