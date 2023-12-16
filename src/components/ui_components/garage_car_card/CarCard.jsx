import { useState, useEffect } from 'react';
import styles from './CarCard.module.css';
import { useGlobalContext } from '../../../contexts/GlobalContext';
import { HiDotsHorizontal } from 'react-icons/hi';


const CarCard = ({username, car}) => {
  const { currentUser } = useGlobalContext();

  const [isEditOverlayOpen, setIsEditOverlayOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className={styles.box} onMouseEnter={()=>(setIsHovering(true))} onMouseLeave={()=>(setIsHovering(false))}>
      <div className={styles.inside_box}>
        <img src={car.first_photo} alt="" className={styles.car_cover} />

        <img src={car.first_photo} alt="" className={`${styles.car_cover_underlay} ${isHovering && styles.show}`} />

        <div className={styles.gradient_box}></div>

        {currentUser === username &&
        <div onClick={()=>(setIsEditOverlayOpen(!isEditOverlayOpen))} className={styles.editbtn}>
          <HiDotsHorizontal />
        </div>}
        

        <div className={styles.text_box}>
          <p className={styles.car_year}>{car.year}</p>
          <p className={styles.car_name}>{car.make_model}</p>
          <p className={styles.car_description}>{car.desc_car}</p>
          <a href="#" className={styles.car_action}>
            <svg stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
            {car.likes}
          </a>
          <a href="#" className={styles.car_action}>
            <svg stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            {car.comment_count}
          </a>
        </div>

      </div>

      {isEditOverlayOpen &&
      <div className={styles.edit_window}>
        <div>Edit window</div>
      </div>}

    </div>
  );
}

export default CarCard;
