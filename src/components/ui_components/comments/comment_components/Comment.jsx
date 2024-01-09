import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../Comments.module.css";
import AddComment from "./AddComment";
import { useGlobalContext } from "../../../../contexts/GlobalContext";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { LuHeart } from "react-icons/lu";
import { BackendURL } from "../../../../utils/Constants";

const Comment = ({ comment, car_id, profile_post_id, club_post_id }) => {
  const { token } = useGlobalContext();
  const [addReply, setAddReply] = useState(false);
  const { updateComments } = useGlobalContext();
  const [timeAgo, setTimeAgo] = useState("");
  const [like, setLike] = useState(0);

  const navigate = useNavigate();

  // Adds a reply to the comment
  const handleReplayClick = () => {
    setAddReply(true);
  };

  // Navigates to users profile when the username is clicked
  const handleUserClick = () => {
    navigate(`/profile/${comment.username}`);
  };

  // Removes the reply form when the comments are updated
  useEffect(() => {
    setAddReply(false);
  }, [updateComments]);

  // Calculates the time since the comment was posted
  useEffect(() => {
    const dateObject = new Date(comment.date_created);
    const utcDate = moment.utc(dateObject);
    const localDate = utcDate.local(); // Convert to the local time zone

    const date = localDate.fromNow();
    setTimeAgo(date);
  }, [comment.date_created]);

  // Handle like click
  const handleLikeClick = async () => {
    try {
      const response = await axios.post(
        `${BackendURL}/comments/like_comment`,
        {
          comment_id: comment.id_comment,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = response.data;
      if (data.success) {
        setLike(1);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <div className={styles.comment}>
      <img
        className={styles.p_img}
        src={comment.p_image_link}
        alt="profile picture"
        onClick={handleUserClick}
        style={{ cursor: "pointer" }}
      />
      <div className={styles.comment_text}>
        <div className={styles.comment_username} onClick={handleUserClick}>
          {comment.username}
          <span className={styles.date}>{timeAgo}</span>
        </div>
        <div className={styles.comment_content}>{comment.text}</div>

        <div className={styles.comment_toolbar}>
          <div className={styles.heart}>
            {comment.has_liked === 1 ? (
              <FaHeart color="red" />
            ) : (
              <>
                {like == 0 ? (
                  <LuHeart
                    onClick={handleLikeClick}
                    className={styles.h_icon}
                  />
                ) : (
                  <FaHeart color="red" />
                )}
              </>
            )}
            <div className={styles.text}>{comment.likes_count + like}</div>
          </div>

          {comment.parrent_comment_id === null && (
            <button className={styles.reply_btn} onClick={handleReplayClick}>
              Reply
            </button>
          )}
        </div>
        {addReply && (
          <AddComment
            parrent_comment_id={comment.id_comment}
            car_id={car_id}
            profile_post_id={profile_post_id}
            club_post_id={club_post_id}
          />
        )}
        {comment.replies &&
          comment.replies.map((item, index) => (
            <Comment key={index} comment={item} />
          ))}
      </div>
    </div>
  );
};

export default Comment;
