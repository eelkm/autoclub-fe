import { useEffect, useState } from "react";
import styles from "./ProfileClubs.module.css";
import axios from "axios";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import ClubCard from "../club_card/ClubCard";

const ProfileClubs = ({userData}) => {
  const { token } = useGlobalContext();
  const [memberOfClubs, setMemberOfClubs] = useState([]);



  useEffect(() => {
    axios.get(`http://localhost:5000/clubs/member_of_clubs?username=${userData.username}`, {
      headers: {
        Authorization: token,
      },
    })
      .then(response => {
        const data = response.data;
        if (data.success) {
          setMemberOfClubs(data.memberOfClubs);
        } else {
          console.error('Error:', data.error);
        }
        console.log('Member clubs:', data);
      })
      .catch(error => {
        console.error('Failed to fetch member clubs:', error);
      });
  }, [userData]); // Fetch member clubs when userData changes



  return (
    <div className={`${styles.pages} ${styles.box}`}>
    <div className={styles.intro_title}>
      Member of:
      <button className={styles.intro_menu} />
    </div>

    {memberOfClubs.map((item, index) => (
        <ClubCard key={index} clubname={item.name} image={item.small_img_url} role_name={item.role_name}/>
    ))}

  </div>
  );
}

export default ProfileClubs;
