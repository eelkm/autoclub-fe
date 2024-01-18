import { useState } from "react";
import { useGlobalContext } from "../../../../contexts/GlobalContext";
import { BackendURL } from "../../../../utils/Constants";
import styles from "../Comments.module.css";
import axios from "axios";
import DefaultPicture from "../../default_picture/DefaultPicture";

const AddComment = ({
  parrent_comment_id,
  car_id,
  profile_post_id,
  club_post_id,
}) => {
  const { token, currentUser, currentUserImg, setUpdateComments } =
    useGlobalContext();

  const [text, setText] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Adds a comment to the database
  const handleAddComment = async () => {
    try {
      const response = await axios.post(
        `${BackendURL}/comments/add_comment`,
        {
          text: text,
          parrent_comment_id: parrent_comment_id,
          car_id: car_id,
          profile_post_id: profile_post_id,
          club_post_id: club_post_id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = response.data;
      if (data.success) {
        setText("");
        setUpdateComments(Math.random());
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <div className={styles.status_menu}>
      {currentUserImg === null ? (
        <div className={styles.p_img}>
          <DefaultPicture username={currentUser} />
        </div>
      ) : (
        <img
          className={styles.p_img}
          src={currentUserImg}
          alt="profile picture"
        />
      )}

      <textarea
        className={styles.status_textarea}
        placeholder="Write comment"
        value={text}
        onChange={handleTextChange}
      />
      <button className={styles.status_add_comment} onClick={handleAddComment}>
        Add
      </button>
    </div>
  );
};

export default AddComment;
