import styles from "./EditCar.module.css";
import { FaTrash } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import axios from "axios";
import { BackendURL } from "../../../utils/constants";
import { uploadFileToS3 } from "../../../utils/ImageUpload";

const EditCar = ({ car, overlay }) => {
  const fileInputRef = useRef(null); // Reference to the hidden file input element
  const [selectedFiles, setSelectedFiles] = useState([]); // Array of selected files
  const [currentImages, setCurrentImages] = useState([]); // Array of current images
  const [currentImagesToDelete, setCurrentImagesToDelete] = useState([]); // Array of current images to delete
  const { token, setUpdateGarage } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false); // Loading state for the submit button
  const [confirmDelete, setConfirmDelete] = useState(false);

  const carBrandRef = useRef(null);
  const carYearRef = useRef(null);
  const carDescriptionRef = useRef(null);

  useEffect(() => {
    getCarImages();
  }, [token]);

  // Fetches the current images of the car
  const getCarImages = async () => {
    try {
      const response = await axios.get(
        `${BackendURL}/cars/car_images?car_id=${car.id_car}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = response.data;

      if (data.success) {
        setCurrentImages(data.results);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

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

  // Deletes car image from the database
  const deleteCurrentImagesToDelete = async (imageId) => {
    try {
      const response = await axios.post(
        `${BackendURL}/cars/delete_car_image`,
        {
          id_car_image: imageId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = response.data;

      if (data.success) {
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  // Adds the current images to the currentImagesToDelete array and removes them from the currentImages array
  const handleRemoveCurrentImage = (index) => {
    setCurrentImagesToDelete((prevFiles) => [
      ...prevFiles,
      currentImages[index],
    ]);
    setCurrentImages((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });

    console.log(currentImagesToDelete);
  };

  // Updates the car data in the database
  const postCar = async () => {
    try {
      const response = await axios.post(
        `${BackendURL}/cars/update_car`,
        {
          make_model: carBrandRef.current.value,
          year: carYearRef.current.value,
          desc_car: carDescriptionRef.current.value,
          id_car: car.id_car,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = response.data;

      if (data.success) {
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

  // Posts the image URL to the database
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
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  // Deletes the car from the database
  const handleDeleteCar = async () => {
    try {
      const response = await axios.post(
        `${BackendURL}/cars/delete_car`,
        {
          id_car: car.id_car,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = response.data;

      if (data.success) {
        window.location.reload(); // Reload page after deleting car
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  // Send car data, images and deleted iamges to the database
  const handleSubmit = async () => {
    setIsLoading(true);
    const carId = car.id_car;
    await postCar();

    for (let i = 0; i < selectedFiles.length; i++) {
      await postImage(carId, selectedFiles[i]);
    }

    for (let i = 0; i < currentImagesToDelete.length; i++) {
      await deleteCurrentImagesToDelete(currentImagesToDelete[i].id_car_image);
    }

    setIsLoading(false);
    setUpdateGarage(Math.random());
    overlay(false);
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
          defaultValue={car.make_model}
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
          defaultValue={car.year}
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
          defaultValue={car.desc_car}
          placeholder="Write what you want.. Modifications etc."
        />
      </div>

      <div className={styles.status_menu}>
        <div className={`${styles.status_menu_item} ${styles.active_st}`}>
          Current images
        </div>
      </div>

      <div className={styles.image_box}>
        {currentImages.map((file, index) => (
          <div key={index} className={styles.image_container}>
            <img
              className={styles.image}
              src={file.car_image_url}
              alt={`Added image ${index + 1}`}
            />
            <button
              className={styles.remove_button}
              onClick={() => handleRemoveCurrentImage(index)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      <div className={styles.status_menu}>
        <div className={`${styles.status_menu_item} ${styles.active_st}`}>
          Added Images
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

      <div className={styles.post_delte_bar}>
        {confirmDelete ? (
          <div className={styles.status_main}>
            <button
              className={styles.status_delete}
              onClick={() => handleDeleteCar()}
            >
              <b>Are you sure?</b>
            </button>
          </div>
        ) : (
          <div className={styles.status_main}>
            <button
              className={styles.status_delete}
              onClick={() => setConfirmDelete(true)}
            >
              Delete Car
            </button>
          </div>
        )}

        <div className={styles.status_main}>
          {isLoading ? (
            <button className={styles.status_loading}>Loading</button>
          ) : (
            <button
              className={styles.status_save}
              onClick={() => handleSubmit()}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditCar;
