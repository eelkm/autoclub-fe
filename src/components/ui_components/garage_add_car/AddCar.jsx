import styles from "./AddCar.module.css";
import { FaTrash } from "react-icons/fa";
import { useRef, useState } from "react";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import axios from "axios";
import { BackendURL } from "../../../utils/Constants";
import { uploadFileToS3 } from "../../../utils/ImageUpload";

const AddCar = () => {
  const fileInputRef = useRef(null); // Reference to the hidden file input element
  const [selectedFiles, setSelectedFiles] = useState([]); // Array of selected files
  const { token, setUpdateGarage } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false); // Loading state for the submit button

  const carBrandRef = useRef(null);
  const carYearRef = useRef(null);
  const carDescriptionRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Adds new files to the selectedFiles array
  const handleFileChange = (event) => {
    const files = event.target.files;
    const newFiles = Array.from(files);

    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // Removes a file from the selectedFiles array
  const handleRemoveImage = (index) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  // Posts car data to db and returns the ID of the added car
  const postCar = async () => {
    try {
      const response = await axios.post(
        `${BackendURL}/cars/add_car`,
        {
          make_model: carBrandRef.current.value,
          year: carYearRef.current.value,
          desc_car: carDescriptionRef.current.value,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = response.data;

      if (data.success) {
        return data.insertedId;
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  // Posts image to S3 and then posts the image URL to the database
  const postImage = async (carId, selectedFile) => {
    return new Promise((resolve) => {
      uploadFileToS3(selectedFile, token).then((imageUrl) => {
        if (imageUrl) {
          postToDB(carId, imageUrl).then(() => resolve());
        }
      });
    });
  };

  const postToDB = async (ID, URL) => {
    try {
      const response = await axios.post(
        `${BackendURL}/cars/add_car_image`,
        {
          car_id: ID,
          car_image_url: URL,
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
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  // Posts car data and images to the database
  const handleSubmit = async () => {
    setIsLoading(true);
    const addedCarId = await postCar();

    for (let i = 0; i < selectedFiles.length; i++) {
      await postImage(addedCarId, selectedFiles[i]);
    }
    setIsLoading(false);
    // Re-render the garage component
    setUpdateGarage(Math.random());

    // Reset the form
    setSelectedFiles([]);
    carBrandRef.current.value = "";
    carYearRef.current.value = "";
    carDescriptionRef.current.value = "";
  };

  return (
    <div className={styles.box}>
      <div className={styles.status_menu}>
        <div className={`${styles.status_menu_item} ${styles.active_st}`}>
          Car brand and model
        </div>
        <textarea
          ref={carBrandRef}
          className={styles.status_textarea}
          placeholder="For example - Honda Prelude / BMW E39"
        />
      </div>

      <div className={styles.status_menu}>
        <div className={`${styles.status_menu_item} ${styles.active_st}`}>
          Year of car
        </div>
        <textarea
          ref={carYearRef}
          className={styles.status_textarea}
          placeholder="For example - 1998"
        />
      </div>

      <div className={styles.status_menu}>
        <div className={`${styles.status_menu_item} ${styles.active_st}`}>
          Description
        </div>
        <textarea
          ref={carDescriptionRef}
          className={styles.status_textarea_desc}
          placeholder="Write what you want.. Modifications etc."
        />
      </div>

      <div className={styles.status_menu}>
        <div className={`${styles.status_menu_item} ${styles.active_st}`}>
          Images
        </div>
        <button onClick={handleButtonClick} className={styles.status_share}>
          <div>Add Image</div>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </button>
      </div>

      <div className={styles.image_box}>
        {selectedFiles.map((file, index) => (
          <div key={index} className={styles.image_container}>
            <img
              className={styles.image}
              src={URL.createObjectURL(file)}
              alt={`Added image ${index + 1}`}
            />
            <button
              className={styles.remove_button}
              onClick={() => handleRemoveImage(index)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      <div className={styles.status_main}>
        {isLoading ? (
          <button className={styles.status_loading}>Loading</button>
        ) : (
          <button className={styles.status_save} onClick={() => handleSubmit()}>
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default AddCar;
