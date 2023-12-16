import styles from './Garage.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CarCard from '../../../ui_components/garage_car_card/CarCard';
import { BackendURL } from '../../../../utils/constants';
import { useGlobalContext } from '../../../../contexts/GlobalContext';

const Garage = ({userData}) => {
  const { token } = useGlobalContext();
  const { currentUser } = useGlobalContext();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios
      .get(`${BackendURL}/users/user_cars?username=${userData.username}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.success) {
          setCars(data.cars);
        } else {
          console.error('Error:', data.error);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch user cars:', error);
      });
  }, [userData, token]);

  return (
    <div>
    
    {cars.map((item, index) => (
      <CarCard key={index} username={userData.username} car={item} />
    ))}

    {cars.length === 0 && <div className={styles.no_cars}>No cars to show.</div>}
    {currentUser === userData.username && <div className={styles.no_cars}>Add a car to your garage.</div>}

    </div>
  );
}

export default Garage;
