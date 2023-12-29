import styles from "./ProfilePost.module.css";
import axios from "axios";
import YouTube from "react-youtube";
import { useState, useEffect } from "react";
import { FaHeart, FaTrash } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import { BackendURL } from "../../../utils/constants";
import { LuHeart } from "react-icons/lu";

const isYouTubeLink = (url) => {
  // console.log(url);
  // Regular expression to match YouTube video URLs
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(embed\/|v\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  return youtubeRegex.test(url);
};

const extractVideoId = (link) => {
  // Regular expression to get video ID from YouTube URL
  const match = link.match(
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  // console.log(match);
  return match && match[1];
};

const ProfilePost = ({ username, p_image, post }) => {
  const { token } = useGlobalContext();
  const { currentUser } = useGlobalContext();

  const [like, setLike] = useState(0);

  const dateObject = new Date(post.date_created);
  const date = dateObject.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);

  // Deletes the post
  const handleDelete = async () => {
    console.log("delete: ", post.id_profile_post);

    try {
      const response = await axios.delete(
        `${BackendURL}/post_user/delete_profile_post`,
        {
          headers: {
            Authorization: token,
          },
          data: {
            id_profile_post: post.id_profile_post,
          },
        }
      );

      const data = response.data;

      if (data.success) {
        console.log("Post deleted");
        setIsDeleteOverlayOpen(true);
      } else {
        console.error("Error:", data.error);
      }

      console.log("DATA:", data);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleLikeClick = async () => {
    try {
      const response = await axios.post(
        `${BackendURL}/post_user/like_post`,
        {
          id_profile_post: post.id_profile_post,
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
    <div className={`${styles.post} ${styles.box}`}>
      <div className={styles.status_main}>
        <img src={p_image} className={styles.status_img} />
        <div className={styles.post_detail}>
          <strong>{username}</strong> added new post
          <div className={styles.post_date}>{date}</div>
        </div>

        {currentUser === username && (
          <div
            onClick={() => setIsDeleteOpen(true)}
            onMouseLeave={() => setIsDeleteOpen(false)}
            className={styles.editbtn}
          >
            {isDeleteOpen ? (
              <div onClick={handleDelete} className={styles.delete_icon_box}>
                <FaTrash color="red" />
              </div>
            ) : (
              <HiDotsHorizontal />
            )}
          </div>
        )}

        {isDeleteOverlayOpen && (
          <div className={styles.delete_window}>
            <div className={styles.delete_window_text}>
              Post has been deleted.
            </div>
          </div>
        )}
      </div>

      <div className={styles.post_content}>
        {post.text}
        {isYouTubeLink(post.post_media_url) ? (
          <YouTube
            videoId={extractVideoId(post.post_media_url)}
            className={styles.post_photo}
          />
        ) : (
          <img src={post.post_media_url} alt="" className={styles.post_photo} />
        )}
      </div>
      <div className={styles.post_actions}>
        <div href="#" className={styles.post_action}>
          {post.has_liked == 1 ? (
            <FaHeart color="red" />
          ) : (
            <>
              {like == 0 ? (
                <LuHeart onClick={handleLikeClick} className={styles.h_icon} />
              ) : (
                <FaHeart color="red" />
              )}
            </>
          )}
          {post.like_count + like}
        </div>
        <a href="#" className={styles.post_action}>
          <svg
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
            viewBox="0 0 24 24"
          >
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          {post.comment_count}
        </a>
      </div>
    </div>
  );
};

export default ProfilePost;
