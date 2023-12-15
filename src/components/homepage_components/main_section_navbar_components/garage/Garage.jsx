import styles from './Garage.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CarCard from '../../../ui_components/garage_car_card/CarCard';

const Garage = ({userData}) => {

  return (
    <div>

    <CarCard username={userData.username} year='1998'/>
    

    </div>
  );
}

export default Garage;
