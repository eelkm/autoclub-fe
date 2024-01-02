import { useEffect, useState } from "react";
import styles from "./Comments.module.css";
import axios from "axios";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import { BackendURL } from "../../../utils/constants";
import AddComment from "./comment_components/AddComment";
import Comment from "./comment_components/Comment";

const Comments = ({ car_id, profile_post_id, club_post_id }) => {
  const { token, updateComments } = useGlobalContext();
  const [comments, setComments] = useState([]);
  const [sortingCriteria, setSortingCriteria] = useState("mostLiked"); // Default to most liked

  useEffect(() => {
    GetComments();
  }, [car_id, profile_post_id, club_post_id, updateComments, sortingCriteria]);

  // Gets the comments from the database
  const GetComments = async () => {
    try {
      const response = await axios.get(`${BackendURL}/comments`, {
        headers: {
          Authorization: token,
        },
        params: {
          car_id: car_id,
          profile_post_id: profile_post_id,
          club_post_id: club_post_id,
        },
      });
      const data = response.data;
      if (data.success) {
        SeparateComments({ data });
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  const SeparateComments = ({ data }) => {
    // Separate comments into two arrays, one for comments and one for replies
    const comments = data.comments.filter(
      (item) => item.parrent_comment_id === null
    );
    const replies = data.comments.filter(
      (item) => item.parrent_comment_id !== null
    );

    // Add replies to their parent comments
    comments.forEach((comment) => {
      comment.replies = replies.filter(
        (reply) => reply.parrent_comment_id === comment.id_comment
      );
    });

    // Sort the comments based on the sorting criteria
    const sortedComments = sortComments(comments, sortingCriteria);

    setComments(sortedComments);
  };

  const sortComments = (comments, criteria) => {
    return comments.slice().sort((a, b) => {
      if (criteria === "latest") {
        // Sort by date_created in descending order
        return new Date(b.date_created) - new Date(a.date_created);
      } else if (criteria === "mostLiked") {
        // Sort by likes_count in descending order
        return b.likes_count - a.likes_count;
      } else {
        return 0; // Default to no sorting
      }
    });
  };

  const handleSorting = (criteria) => {
    setSortingCriteria(criteria);
  };

  return (
    <div className={styles.box}>
      <AddComment
        car_id={car_id}
        profile_post_id={profile_post_id}
        club_post_id={club_post_id}
      />
      <div className={styles.sort}>
        <span>Sort by:</span>
        <button onClick={() => handleSorting("latest")}>Latest</button>
        <button onClick={() => handleSorting("mostLiked")}>Most liked</button>
      </div>
      {comments &&
        comments.map((item, index) => (
          <Comment
            key={index}
            comment={item}
            car_id={car_id}
            profile_post_id={profile_post_id}
            club_post_id={club_post_id}
          />
        ))}
    </div>
  );
};

export default Comments;
