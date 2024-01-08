import React, { useRef } from "react";
import styles from "./EditProfile.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../../../../contexts/GlobalContext";
import { BackendURL } from "../../../../utils/constants";
import { uploadFileToS3 } from "../../../../utils/ImageUpload";

const EditProfile = ({ userData }) => {
  const { token } = useGlobalContext();
  const [descAbout, setDescAbout] = useState(userData.desc_about);
  const [fileName, setFileName] = useState("");
  const [fileName2, setFileName2] = useState("");
  const fileInputRef = useRef(null); // Reference to the hidden file input element
  const fileInputRef2 = useRef(null); // Reference to the hidden file input element
  const [s3profileUrl, setS3ProfileUrl] = useState("");
  const [s3coverUrl, setS3CoverUrl] = useState("");

  // =======================
  // Update description
  // =======================

  const handleTextChange = (e) => {
    setDescAbout(e.target.value);
  };

  const postDescription = async () => {
    try {
      const response = await axios.post(
        `${BackendURL}/users/update_desc_about`,
        {
          desc_about: descAbout,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = response.data;

      if (data.success) {
        console.log("Success:", data.message);
        return true;
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  //========================
  // Update profile picture
  // =======================

  const handleProfilePictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChangePP = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile.name);
      setFileName(selectedFile.name); // Save selected file name

      uploadFileToS3(selectedFile, token).then((imageUrl) => {
        if (imageUrl) {
          setS3ProfileUrl(imageUrl);
        }
      });
    }
  };

  const postProfilePicture = async () => {
    console.log(s3profileUrl);
    try {
      const response = await axios.post(
        `${BackendURL}/users/update_profile_picture`,
        {
          p_image_link: s3profileUrl,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = response.data;
      if (data.success) {
        console.log("Success:", data.message);
        return true;
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  // =======================
  // Update cover picture
  // =======================

  const handleCoverPictureClick = () => {
    if (fileInputRef2.current) {
      fileInputRef2.current.click();
    }
  };

  const handleFileChangeCP = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile.name);
      setFileName2(selectedFile.name); // Save selected file name

      uploadFileToS3(selectedFile, token).then((imageUrl) => {
        if (imageUrl) {
          setS3CoverUrl(imageUrl);
        }
      });
    }
  };

  const postCoverPicture = async () => {
    console.log(s3coverUrl);
    try {
      const response = await axios.post(
        `${BackendURL}/users/update_cover_picture`,
        {
          p_banner_link: s3coverUrl,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = response.data;
      if (data.success) {
        console.log("Success:", data.message);
        return true;
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  // =======================
  // Save changes to DB
  // =======================

  const handleSave = () => {
    postDescription();
    if (fileName) {
      postProfilePicture();
    }
    if (fileName2) {
      postCoverPicture();
    }
    window.location.reload();
  };

  return (
    <div className={styles.box}>
      <div className={styles.status_menu}>
        <div className={`${styles.status_menu_item} ${styles.active_st}`}>
          Add description
        </div>
      </div>
      <div className={styles.status_main}>
        <textarea
          className={styles.status_textarea}
          onChange={(e) => handleTextChange(e)}
          placeholder="Write what you like, where are you from, what are you doing, etc.."
          defaultValue={userData.desc_about}
        />
      </div>
      <div className={styles.status_menu}>
        <div className={`${styles.status_menu_item} ${styles.active_st}`}>
          Upload new profile picture
        </div>
      </div>
      <div className={styles.status_main}>
        <div
          onClick={handleProfilePictureClick}
          className={styles.status_action}
        >
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChangePP}
          />
          <button className={styles.status_share}>
            {fileName ? <div>{fileName}</div> : <div>Upload</div>}
          </button>
        </div>
      </div>
      <div className={styles.status_menu}>
        <div className={`${styles.status_menu_item} ${styles.active_st}`}>
          Upload new cover picture
        </div>
      </div>
      <div className={styles.status_main}>
        <div onClick={handleCoverPictureClick} className={styles.status_action}>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            ref={fileInputRef2}
            onChange={handleFileChangeCP}
          />
          <button className={styles.status_share}>
            {fileName2 ? <div>{fileName2}</div> : <div>Upload</div>}
          </button>
        </div>
      </div>
      <div className={styles.status_main}>
        <button className={styles.status_save} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
