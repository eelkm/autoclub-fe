import ImageSlider from "../../ui_components/image_slider/ImageSlider";
import axios from "axios";
import styles from "./CarSection.module.css";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import { useEffect, useState } from "react";
import { BackendURL } from "../../../utils/constants";
import { useLocation } from "react-router-dom";
import TopSearchBar from "../../ui_components/top_search_bar/TopSearchBar";
import Comments from "../../ui_components/comments/Comments";
import { LuHeart } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { NavConstants } from "../../../utils/constants";

const CarSection = ({ userData }) => {
  const { token, setProfileNav } = useGlobalContext();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const location = useLocation();
  const [carId, setCarId] = useState();
  const [carData, setCarData] = useState();
  const [like, setLike] = useState(0);
  const [hasLiked, setHasLiked] = useState();

  useEffect(() => {
    const carId = location.pathname.split("/").pop();
    setCarId(carId);
    fetchImages({ carId });
    getCarData({ carId });
  }, []);

  // Fetches the images of the car
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

  // Fetches the data of the car
  const getCarData = async ({ carId }) => {
    try {
      const response = await axios.get(
        `${BackendURL}/cars/get_car?car_id=${carId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = response.data;

      if (data.success) {
        setHasLiked(data.hasLiked);
        setCarData(data.car);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  // Handle user click
  const handleUserClick = () => {
    setProfileNav(NavConstants.Profile);
    navigate(`/profile/${userData.username}`);
  };

  // Handle like click
  const handleLikeClick = async () => {
    try {
      const response = await axios.post(
        `${BackendURL}/cars/like_car`,
        {
          car_id: carId,
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
    <div className={styles.main}>
      <TopSearchBar />

      {carData && (
        <div className={styles.main_container}>
          {images.length > 0 ? <ImageSlider images={images} /> : null}

          <div className={styles.desc}>
            <div className={styles.user} onClick={handleUserClick}>
              <img src={userData.p_image_link} alt="logo" />
              <div className={styles.text}>{userData.username}</div>
            </div>

            <div className={styles.car}>
              <div className={styles.text}>{carData.year}</div>
              <div className={styles.text}>{carData.make_model}</div>
            </div>

            <div className={styles.hearth}>
              {hasLiked ? (
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

              <div className={styles.text}>{carData.likes_count + like}</div>
            </div>
          </div>

          <div className={styles.desc_box}>{carData.desc_car}</div>

          <Comments carId={carId} />
        </div>
      )}
    </div>
  );
};

export default CarSection;
