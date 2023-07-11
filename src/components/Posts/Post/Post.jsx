import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import arrowIcon from "../../../assets/images/arrow.svg";
import arrowUpIcon from "../../../assets/images/arrowUp.svg";
import commentsIcon from "../../../assets/images/comments.svg";
import commentsInactiveIcon from "../../../assets/images/commentsInactive.svg";
import deleteIcon from "../../../assets/images/delete.svg";
import dislikeIcon from "../../../assets/images/dislike.svg";
import editIcon from "../../../assets/images/edit.svg";
import favoriteIcon from "../../../assets/images/favorite.svg";
import favoriteIconClick from "../../../assets/images/favoriteClick.svg";
import likeIcon from "../../../assets/images/like.svg";
import logo from "../../../assets/images/logoXL.svg";
import {
  closeComments,
  deletePost,
  editPost,
  fetchComments,
} from "../../../redux/slices/postsSlice";
import DeletePopup from "../../Popup/DeletePopup";
import EditPostPopup from "../../Popup/EditPostPopup";
import "./Post.scss";

function Post({ post, handleToggleFavorite }) {
  const dispatch = useDispatch();

  // Комментарии
  const comments = useSelector(state => state.posts.comments);

  const handleCommentsClick = postId => {
    if (comments[postId]) {
      dispatch(closeComments(postId));
    } else {
      dispatch(fetchComments(postId));
    }
  };

  // Изменение поста
  const [isShowEdit, setIsShowEdit] = useState(false);

  const handleEditSubmit = async (event, postId) => {
    event.preventDefault();

    const updatedTitle = event.target.title.value;
    const updatedText = event.target.body.value;

    dispatch(editPost({ postId, updatedText, updatedTitle }));
    setIsShowEdit(false);
  };

  // Удаление поста
  const [isShowDelete, setIsShowDelete] = useState(false);

  const handleDelete = postId => {
    dispatch(deletePost(postId));
    setIsShowDelete(false);
  };

  return (
    <div className={post.favorite ? "post__favorite" : "post"} key={post.id}>
      <div className="post__container">
        <div className="post__wrap">
          <img className="post__logo" src={logo} alt="logo" />
          <h2 className="post__name">@{post.id}</h2>
        </div>
        <div className="post__wrap">
          <img
            className="post__icon"
            src={editIcon}
            alt="editIcon"
            onClick={() => setIsShowEdit(true)}
          />
          <img
            className="post__icon"
            src={post.favorite ? favoriteIconClick : favoriteIcon}
            alt="favoriteIcon"
            onClick={() => handleToggleFavorite(post.id)}
          />
          <img
            className="post__icon"
            src={deleteIcon}
            alt="deleteIcon"
            onClick={() => setIsShowDelete(true)}
          />
        </div>
      </div>
      <h2 className="post__title">{post.title}</h2>
      <p className="post__text">{post.body}</p>
      <div
        className="post__wrapper"
        onClick={() => handleCommentsClick(post.id)}
      >
        <img
          className="post__icon"
          src={comments[post.id] ? commentsIcon : commentsInactiveIcon}
          alt="commentsIcon"
        />
        <h3 className="post__comments">комментарии</h3>
        <img
          className="post__arrrow"
          src={comments[post.id] ? arrowUpIcon : arrowIcon}
          alt="arrowIcon"
        />
      </div>
      {comments[post.id] && (
        <div className="post-comment">
          {comments[post.id].length > 0 ? (
            <>
              {comments[post.id].map(comment => (
                <div className="post-comment__content" key={comment.id}>
                  <div className="post-comment__container">
                    <div className="post-comment__wrap">
                      <img
                        className="post-comment__logo"
                        src={logo}
                        alt="logo"
                      />
                      <h4 className="post-comment__name">{comment.name}</h4>
                    </div>
                    <h5 className="post-comment__email">{comment.email}</h5>
                  </div>
                  <p className="post-comment__text">{comment.body}</p>
                  <div className="post-comment__wrap">
                    <img
                      className="post-comment__like"
                      src={likeIcon}
                      alt="likeIcon"
                    />
                    <img
                      className="post-comment__like"
                      src={dislikeIcon}
                      alt="dislikeIcon"
                    />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="post-comment__without">
              Комментарии никто не оставлял ಠ_ಠ
            </p>
          )}
        </div>
      )}
      {isShowEdit && (
        <EditPostPopup
          isShow={isShowEdit}
          setIsShow={setIsShowEdit}
          handleEditSubmit={event => handleEditSubmit(event, post.id)}
          post={post}
        />
      )}
      {isShowDelete && (
        <DeletePopup
          title="пост"
          isShow={isShowDelete}
          setIsShow={setIsShowDelete}
          handleDelete={() => handleDelete(post.id)}
        />
      )}
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    favorite: PropTypes.bool.isRequired,
  }).isRequired,
  handleToggleFavorite: PropTypes.func.isRequired,
};

export default Post;
