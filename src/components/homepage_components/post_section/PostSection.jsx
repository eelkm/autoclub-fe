import { useEffect, useState } from "react";
import TopSearchBar from "../../ui_components/top_search_bar/TopSearchBar";
import styles from "./PostSection.module.css";
import axios from "axios";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import { BackendURL } from "../../../utils/constants";
import ProfilePost from "../../ui_components/profile_post/ProfilePost";
import Comments from "../../ui_components/comments/Comments";

const PostSection = ({ userData }) => {
  const { token } = useGlobalContext();
  const [postId, setPostId] = useState();
  const [post, setPost] = useState();

  useEffect(() => {
    const postId = location.pathname.split("/").pop();
    setPostId(postId);
    getPost({ postId });
  }, []);

  const getPost = async ({ postId }) => {
    try {
      const response = await axios.get(
        `${BackendURL}/post_user/get_post?id_profile_post=${postId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = response.data;

      if (data.success) {
        setPost(data.post);
        console.log(data.post);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <div className={styles.main}>
      <TopSearchBar />
      <div className={styles.box}>
        {post && (
          <ProfilePost
            username={userData.username}
            p_image={userData.p_image_link}
            post={post}
          />
        )}

        <Comments />
      </div>
    </div>
  );
};

export default PostSection;
