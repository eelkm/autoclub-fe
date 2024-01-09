import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./RightSide.module.css";
import ClubCard from "../../ui_components/club_card/ClubCard";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import { BackendURL } from "../../../utils/Constants";
import LogoutBtn from "../../ui_components/logout_btn/LogoutBtn";
import MediaQuery from "react-responsive";

const RightSide = ({ userData }) => {
  const { token } = useGlobalContext();

  // Get the user's clubs and roles
  const [member, setMember] = useState([]);
  const [follower, setFollower] = useState([]);

  useEffect(() => {
    const fetchUserRolesClubsData = async () => {
      try {
        const response = await axios.get(
          `${BackendURL}/clubs/get_clubs_roles`,
          {
            headers: { Authorization: `${token}` },
          }
        );

        // The data is separated into two arrays, one for member and one for follower
        const memberData = response.data.userRolesClubs.filter(
          (item) =>
            (item.role_name === "Owner" ||
              item.role_name === "Member" ||
              item.role_name === "Moderator") &&
            item.is_approved === 1
        );

        const followerData = response.data.userRolesClubs.filter(
          (item) => item.role_name === "Follower"
        );

        setMember(memberData);
        setFollower(followerData);
      } catch (error) {
        console.error("Failed to fetch user roles clubs data", error);
      }
    };

    fetchUserRolesClubsData();
  }, []); // No dependencies, so it only runs once on mount

  // Search bar for following clubs
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFollowers = follower.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.right_side}>
      <MediaQuery minWidth={1001}>
        <div className={styles.account}>
          <LogoutBtn />
        </div>
      </MediaQuery>
      <div className={`${styles.side_wrapper} ${styles.stories}`}>
        <div className={styles.side_title}>MEMBER {member.length}</div>
        {member.map((item, index) => (
          <ClubCard
            key={index}
            clubname={item.name}
            image={item.small_img_url}
          />
        ))}
      </div>

      <div className={`${styles.side_wrapper} ${styles}`}>
        <div className={styles.side_title}>FOLLOWING {follower.length}</div>
        {filteredFollowers.map((item, index) => (
          <ClubCard
            key={index}
            clubname={item.name}
            image={item.small_img_url}
          />
        ))}
      </div>

      <div className={`${styles.search_bar} ${styles.right_search}`}>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default RightSide;
