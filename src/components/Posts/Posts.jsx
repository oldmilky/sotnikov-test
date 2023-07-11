import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  setPostsPerPage,
  toggleFavorite,
} from "../../redux/slices/postsSlice";
import Filter from "../Filter/Filter";
import AddPostPopup from "../Popup/AddPostPopup";
import Quality from "../Quality/Quality";
import SkeletonPost from "../Skeleton/SkeletonPost";
import Title from "../Title/Title";
import Post from "./Post/Post";
import "./Posts.scss";

function Posts() {
  const dispatch = useDispatch();

  // Получение постов, текущей страницы, количества постов на странице
  const {
    data: posts,
    loading,
    error,
    postsPerPage,
  } = useSelector(state => state.posts);

  const favorites = useSelector(state => state.posts.favorites);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, postsPerPage]);

  // хэндл изменения количества постов на странице
  const handlePostsPerPageChange = value => {
    dispatch(setPostsPerPage(value));
  };

  // хэндл избранного
  const handleToggleFavorite = postId => {
    dispatch(toggleFavorite(postId));
  };

  // хэндл открытия попапа
  const [isShowAdd, setIsShowAdd] = useState(false);

  const skeletons = [...new Array(10)].map((_, index) => (
    <SkeletonPost key={index} />
  ));

  // хэндл показывать только избранные
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const handleToggleFavoritesOnly = () => {
    setShowFavoritesOnly(prevState => !prevState);
  };

  // поиск по названию
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Title
        title="Посты пользователей"
        titleButton="Добавить пост"
        setIsShow={() => setIsShowAdd(true)}
      />
      <Quality
        value={postsPerPage}
        handle={handlePostsPerPageChange}
        data={posts}
        title="постов"
      />
      <section className="posts">
        <Filter
          value={searchQuery}
          setter={setSearchQuery}
          checked={showFavoritesOnly}
          handle={handleToggleFavoritesOnly}
          title="избранные"
        />
        <div className="posts__container">
          {error ? (
            <div> errorka :c {error}</div>
          ) : (
            <>
              {loading ? (
                <>{skeletons}</>
              ) : (
                <>
                  {showFavoritesOnly
                    ? favorites.map(postId => {
                        const post = posts.find(post => post.id === postId);
                        return post ? (
                          <Post
                            key={post.id}
                            post={post}
                            handleToggleFavorite={handleToggleFavorite}
                          />
                        ) : null;
                      })
                    : posts
                        .filter(post => post.title.includes(searchQuery))
                        .map(post => (
                          <Post
                            key={post.id}
                            post={post}
                            handleToggleFavorite={handleToggleFavorite}
                          />
                        ))}
                </>
              )}
            </>
          )}
        </div>
        {isShowAdd && (
          <AddPostPopup isShow={isShowAdd} setIsShow={setIsShowAdd} />
        )}
      </section>
    </>
  );
}

export default Posts;
