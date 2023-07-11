import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPhotos,
  setPhotosPerPage,
  toggleFavorite,
} from "../../redux/slices/photosSlice";
import Filter from "../Filter/Filter";
import Loader from "../Loader/Loader";
import Quality from "../Quality/Quality";
import Title from "../Title/Title";
import Photo from "./Photo/Photo";
import "./Photos.scss";

function Photos() {
  const dispatch = useDispatch();
  const photos = useSelector(state => state.photos.data);
  const loading = useSelector(state => state.photos.loading);
  const error = useSelector(state => state.photos.error);
  const photosPerPage = useSelector(state => state.photos.photosPerPage);
  const favorites = useSelector(state => state.photos.favorites);

  // Получение фото
  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch, photosPerPage]);

  // хэндл избранного
  const handleToggleFavorite = photoId => {
    dispatch(toggleFavorite(photoId));
  };

  // хэндл изменения количества постов на странице
  const handlePhotosPerPageChange = value => {
    dispatch(setPhotosPerPage(value));
  };

  // хэндл показывать только избранные
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const handleToggleFavoritesOnly = () => {
    setShowFavoritesOnly(prevState => !prevState);
  };

  // поиск по названию
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Title title="Фото пользователей" />
      <Quality
        value={photosPerPage}
        handle={handlePhotosPerPageChange}
        data={photos}
        title="фото"
      />
      <section className="photos">
        <Filter
          value={searchQuery}
          setter={setSearchQuery}
          checked={showFavoritesOnly}
          handle={handleToggleFavoritesOnly}
          title="избранные"
        />
        <div className="photos__container">
          {error ? (
            <div> errorka :c {error}</div>
          ) : (
            <>
              {loading ? (
                <>
                  <Loader />
                  <Loader />
                </>
              ) : (
                <>
                  {showFavoritesOnly
                    ? favorites.map(photoId => {
                        const photo = photos.find(
                          photo => photo.id === photoId
                        );
                        return photo ? (
                          <Photo
                            key={photo.id}
                            photo={photo}
                            handleToggleFavorite={handleToggleFavorite}
                          />
                        ) : null;
                      })
                    : photos
                        .filter(photo => photo.title.includes(searchQuery))
                        .map(photo => (
                          <Photo
                            key={photo.id}
                            photo={photo}
                            handleToggleFavorite={handleToggleFavorite}
                          />
                        ))}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Photos;
