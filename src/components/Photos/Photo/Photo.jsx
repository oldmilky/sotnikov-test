import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import deleteIcon from "../../../assets/images/delete.svg";
import editIcon from "../../../assets/images/edit.svg";
import favoriteIcon from "../../../assets/images/favorite.svg";
import favoriteIconClick from "../../../assets/images/favoriteClick.svg";
import logoXL from "../../../assets/images/logoXL.svg";
import {
  deletePhoto,
  updatePhotoTitle,
} from "../../../redux/slices/photosSlice";
import DeletePopup from "../../Popup/DeletePopup";
import EditTaskPopup from "../../Popup/EditTaskPopup";
import FullPhotoPopup from "../../Popup/FullPhotoPopup";
import "./Photo.scss";

function Photo({ photo, handleToggleFavorite }) {
  
  const dispatch = useDispatch();
  const [isShowFull, setIsShowFull] = useState(false);

  // Изменение фото
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(photo.title);

  const handleSaveClick = () => {
    if (newTitle.trim() !== "") {
      dispatch(updatePhotoTitle({ photoId: photo.id, newTitle }));
      setIsShowEdit(false);
    }
  };

  // Удаление фото
  const [isShowDelete, setIsShowDelete] = useState(false);

  const handleDelete = postId => {
    dispatch(deletePhoto(postId));
    setIsShowDelete(false);
  };

  return (
    <div className={photo.favorite ? "photo__favorite" : "photo"}>
      <div className="photo__container">
        <div className="photo__wrap">
          <img className="photo__logo" src={logoXL} alt="logo" />
          <h1 className="photo__name">@{photo.id}</h1>
        </div>
        <div className="photo__wrap">
          <img
            className="photo__icon"
            src={editIcon}
            alt="editIcon"
            onClick={() => setIsShowEdit(true)}
          />
          <img
            className="photo__icon"
            src={photo.favorite ? favoriteIconClick : favoriteIcon}
            alt="favoriteIcon"
            onClick={() => handleToggleFavorite(photo.id)}
          />
          <img
            className="photo__icon"
            src={deleteIcon}
            alt="deleteIcon"
            onClick={() => setIsShowDelete(true)}
          />
        </div>
      </div>
      <h2 className="photo__title">{photo.title}</h2>
      <img
        className="photo__image"
        src={photo.url}
        alt="photo"
        onClick={() => setIsShowFull(true)}
      />
      {isShowFull && (
        <FullPhotoPopup
          isShow={isShowFull}
          setIsShow={setIsShowFull}
          photoUrl={photo.url}
        />
      )}
      {isShowEdit && (
        <EditTaskPopup
          isShow={isShowEdit}
          setIsShow={setIsShowEdit}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          handleSaveClick={handleSaveClick}
        />
      )}
      {isShowDelete && (
        <DeletePopup
          title="пост"
          isShow={isShowDelete}
          setIsShow={setIsShowDelete}
          handleDelete={() => handleDelete(photo.id)}
        />
      )}
    </div>
  );
}

Photo.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    favorite: PropTypes.bool.isRequired,
  }),
  handleToggleFavorite: PropTypes.func.isRequired,
};

export default Photo;
