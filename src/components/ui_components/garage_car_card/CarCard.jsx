import { useState, useEffect } from "react";
import styles from "./CarCard.module.css";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
import EditCar from "../garage_edit_car/EditCar";
import { useNavigate } from "react-router-dom";
import { LuHeart } from "react-icons/lu";
import { BiComment } from "react-icons/bi";

const CarCard = ({ username, car }) => {
  const { currentUser } = useGlobalContext();
  const navigate = useNavigate();

  const [isEditOverlayOpen, setIsEditOverlayOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Navigate to the car's page when the user clicks on the car card
  const handleClick = () => {
    navigate(`/profile/${username}/car/${car.id_car}`);
  };

  return (
    <div
      className={styles.box}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={styles.inside_box}>
        <img src={car.first_photo} alt="" className={styles.car_cover} />

        <img
          src={car.first_photo}
          alt=""
          className={`${styles.car_cover_underlay} ${
            isHovering & !isEditOverlayOpen && styles.show
          }`}
        />

        <div className={styles.gradient_box}></div>

        {currentUser === username && (
          <div
            onClick={() => setIsEditOverlayOpen(!isEditOverlayOpen)}
            className={styles.editbtn}
          >
            {isEditOverlayOpen ? (
              <MdCancel color="red" />
            ) : (
              <HiDotsHorizontal />
            )}
          </div>
        )}

        <div className={styles.text_box} onClick={handleClick}>
          <p className={styles.car_year}>{car.year}</p>
          <p className={styles.car_name}>{car.make_model}</p>
          <p className={styles.car_description}>{car.desc_car}</p>

          {car.comment_count > 0 && (
            <a href="#" className={styles.car_action}>
              <BiComment />
              {car.comment_count}
            </a>
          )}
        </div>
      </div>

      {isEditOverlayOpen && (
        <div className={styles.edit_window}>
          <EditCar car={car} overlay={setIsEditOverlayOpen} />
        </div>
      )}
    </div>
  );
};

export default CarCard;
