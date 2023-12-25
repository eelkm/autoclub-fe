import styles from "./ImageSlider.module.css";
import React, { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className={styles.slider}>
        <img
          src={images[currentImageIndex].car_image_url}
          alt={images[currentImageIndex].title}
          className={styles.image}
        />

        {images.length > 1 && (
          <>
            <button className={styles.button_left} onClick={prevImage}>
              <GrPrevious />
            </button>
            <button className={styles.button_right} onClick={nextImage}>
              <GrNext />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ImageSlider;
