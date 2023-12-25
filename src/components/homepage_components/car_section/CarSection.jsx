import ImageSlider from "../../ui_components/image_slider/ImageSlider";
import axios from "axios";
import styles from "./CarSection.module.css";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import { useEffect, useState } from "react";
import { BackendURL } from "../../../utils/constants";
import { useLocation } from "react-router-dom";
import TopSearchBar from "../../ui_components/top_search_bar/TopSearchBar";

const CarSection = ({ userData }) => {
  const { token } = useGlobalContext();
  const [images, setImages] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const carId = location.pathname.split("/").pop();
    fetchImages({ carId });
  }, []);

  const fetchImages = async ({ carId }) => {
    try {
      const response = await axios.get(
        `${BackendURL}/cars/car_images?car_id=${carId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = response.data;

      if (data.success) {
        setImages(data.results);
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
      <div className={styles.main_container}>
        {images.length > 0 ? <ImageSlider images={images} /> : null}
      </div>
    </div>
  );
};

export default CarSection;
