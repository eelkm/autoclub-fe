import { useEffect, useRef, useState } from "react";
import styles from "./ProfileAddPost.module.css";
import axios from "axios";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import { BackendURL } from "../../../utils/constants";
import { uploadFileToS3 } from "../../../utils/ImageUpload";

const ProfileAddPost = ({ userData }) => {
  const { token } = useGlobalContext();
  const fileInputRef = useRef(null); // Reference to the hidden file input element
  const [addVideoWindow, setAddVideoWindow] = useState(false);

  const [fileName, setFileName] = useState("");

  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [s3imageUrl, setS3ImageUrl] = useState("");

  const [text, setText] = useState("");
  // const [finalUrl, setFinalUrl] = useState(''); // Final URL to be saved to the database (either S3 image URL or Youtube video URL)

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile.name);
      setFileName(selectedFile.name); // Save selected file name

      // Upload image to S3 bucket
      uploadFileToS3(selectedFile, token).then((imageUrl) => {
        if (imageUrl) {
          setS3ImageUrl(imageUrl);
        }
      });
    }
  };

  const handleUrlLogic = () => {
    let finalUrl = "";
    if (addVideoWindow) {
      finalUrl = youtubeUrl;
    } else {
      finalUrl = s3imageUrl;
    }

    return finalUrl;
  };

  const handleSubmit = async () => {
    console.log("Submit");
    handleUrlLogic(); // Set final URL

    try {
      // Save post to the database with error checking
      const response = await axios.post(
        `${BackendURL}/post_user/add_post`,
        {
          text: text,
          post_media_url: handleUrlLogic(),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        console.log("Post added successfully:", response.data);
        window.location.reload(); // Reload page after adding post
      } else {
        console.error("Failed to add post. Status:", response.status);
      }
    } catch (error) {
      console.error("Error while adding post:", error);
    }
  };

  return (
    <div className={`${styles.margin} ${styles.box}`}>
      <div className={styles.status_menu}>
        <div className={`${styles.status_menu_item} ${styles.active_st}`}>
          Share a post
        </div>
      </div>
      <div className={styles.status_main}>
        <img src={userData.p_image_link} className={styles.status_img} />
        <textarea
          className={styles.status_textarea}
          onChange={(e) => handleTextChange(e)}
          placeholder="Write something.."
          defaultValue={""}
        />
      </div>

      {/* Add youtube link window */}
      {addVideoWindow && (
        <div className={styles.video_window}>
          <input
            className={styles.video_input}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="Paste Youtube link"
          />
        </div>
      )}

      <div className={styles.status_actions}>
        {addVideoWindow ? (
          ""
        ) : (
          <div onClick={handleButtonClick} className={styles.status_action}>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M23 4v2h-3v3h-2V6h-3V4h3V1h2v3h3zm-8.5 7c.828 0 1.5-.672 1.5-1.5S15.328 8 14.5 8 13 8.672 13 9.5s.672 1.5 1.5 1.5zm3.5 3.234l-.513-.57c-.794-.885-2.18-.885-2.976 0l-.655.73L9 9l-3 3.333V6h7V4H6c-1.105 0-2 .895-2 2v12c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2v-7h-2v3.234z"
                fill="#FFFFFF"
              />
            </svg>
            {fileName ? <div>{fileName}</div> : <div>Add Image</div>}
          </div>
        )}

        {fileName ? (
          ""
        ) : (
          <div
            onClick={() => setAddVideoWindow(!addVideoWindow)}
            className={styles.status_action}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.49614 7.13176C9.18664 6.9549 8.80639 6.95617 8.49807 7.13509C8.18976 7.31401 8 7.64353 8 8V16C8 16.3565 8.18976 16.686 8.49807 16.8649C8.80639 17.0438 9.18664 17.0451 9.49614 16.8682L16.4961 12.8682C16.8077 12.6902 17 12.3589 17 12C17 11.6411 16.8077 11.3098 16.4961 11.1318L9.49614 7.13176ZM13.9844 12L10 14.2768V9.72318L13.9844 12Z"
                fill="#FFFFFF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 12C0 8.25027 0 6.3754 0.954915 5.06107C1.26331 4.6366 1.6366 4.26331 2.06107 3.95491C3.3754 3 5.25027 3 9 3H15C18.7497 3 20.6246 3 21.9389 3.95491C22.3634 4.26331 22.7367 4.6366 23.0451 5.06107C24 6.3754 24 8.25027 24 12C24 15.7497 24 17.6246 23.0451 18.9389C22.7367 19.3634 22.3634 19.7367 21.9389 20.0451C20.6246 21 18.7497 21 15 21H9C5.25027 21 3.3754 21 2.06107 20.0451C1.6366 19.7367 1.26331 19.3634 0.954915 18.9389C0 17.6246 0 15.7497 0 12ZM9 5H15C16.9194 5 18.1983 5.00275 19.1673 5.10773C20.0989 5.20866 20.504 5.38448 20.7634 5.57295C21.018 5.75799 21.242 5.98196 21.4271 6.23664C21.6155 6.49605 21.7913 6.90113 21.8923 7.83269C21.9973 8.80167 22 10.0806 22 12C22 13.9194 21.9973 15.1983 21.8923 16.1673C21.7913 17.0989 21.6155 17.504 21.4271 17.7634C21.242 18.018 21.018 18.242 20.7634 18.4271C20.504 18.6155 20.0989 18.7913 19.1673 18.8923C18.1983 18.9973 16.9194 19 15 19H9C7.08058 19 5.80167 18.9973 4.83269 18.8923C3.90113 18.7913 3.49605 18.6155 3.23664 18.4271C2.98196 18.242 2.75799 18.018 2.57295 17.7634C2.38448 17.504 2.20866 17.0989 2.10773 16.1673C2.00275 15.1983 2 13.9194 2 12C2 10.0806 2.00275 8.80167 2.10773 7.83269C2.20866 6.90113 2.38448 6.49605 2.57295 6.23664C2.75799 5.98196 2.98196 5.75799 3.23664 5.57295C3.49605 5.38448 3.90113 5.20866 4.83269 5.10773C5.80167 5.00275 7.08058 5 9 5Z"
                fill="#FFFFFF"
              />
            </svg>
            {addVideoWindow ? <div>Cancel</div> : <div>Add Video</div>}
          </div>
        )}

        {/* If there is file and there are not image link, then cant submit */}
        {(fileName !== "") & (s3imageUrl == "") ? (
          <button className={styles.status_loading}>Loading...</button>
        ) : (
          <button className={styles.status_share} onClick={handleSubmit}>
            Post
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileAddPost;
