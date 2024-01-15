import React, { useState, useEffect } from "react";
import axios from "axios";
import LeftSide from "./Navigation/left_side/LeftSide";
import RightSide from "./Navigation/right_side/RightSide";
import MainSection from "./Homepage/main_section/MainSection";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { BackendURL } from "../utils/constants";
import CarSection from "./Homepage/car_section/CarSection";
import PostSection from "./Homepage/post_section/PostSection";
import MediaQuery from "react-responsive";
import MobileLeftSide from "./Navigation/left_side/MobileLeftSide";
import MobileRightSide from "./Navigation/right_side/MobileRightSide";
import ErrorPage from "./Navigation/error_page/ErrorPage";

function Homepage({ token }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    currentUser,
    setCurrentUser,
    setCurrentUserImg,
    openMobileRight,
    updateProfile,
  } = useGlobalContext();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Gets the username of the logged in user
    const fetchUsername = async () => {
      try {
        const response = await axios.get(`${BackendURL}/users/get_username`, {
          headers: {
            Authorization: token,
          },
        });

        const data = response.data;

        if (response.status === 200) {
          setCurrentUser(data.username);
          setCurrentUserImg(data.p_image_link);
        } else {
          console.error("Error:", data.error);
        }
      } catch (error) {
        console.error("Failed to fetch username:", error);
      }
    };

    // Gets the user data of the user whose profile is being viewed
    const fetchUserData = async () => {
      try {
        const pathParts = location.pathname.split("/profile/");
        const usernameToSearch = pathParts[1]
          ? pathParts[1].split("/")[0]
          : currentUser;

        const response = await axios.get(
          `${BackendURL}/users/get_user?username=${usernameToSearch}`,
          {
            headers: { Authorization: `${token}` },
          }
        );
        setUserData(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUsername();
    fetchUserData();
  }, [token, location.pathname, updateProfile]); // Fetch user data when token or location.pathname changes

  return (
    <div>
      {userData && (
        <>
          <div className="container">
            <MediaQuery minWidth={701}>
              <LeftSide />
            </MediaQuery>

            <Routes>
              <Route path="*" element={<ErrorPage />} />

              <Route
                path="/profile/:username"
                element={<MainSection userData={userData} />}
              />
              <Route
                path="/profile/:username/car/:carId"
                element={<CarSection userData={userData} />}
              />
              <Route
                path="/profile/:username/post/:postId"
                element={<PostSection userData={userData} />}
              />
            </Routes>

            <MediaQuery minWidth={701}>
              <RightSide userData={userData} />
            </MediaQuery>
          </div>

          <MediaQuery maxWidth={700}>
            {openMobileRight && <MobileRightSide />}
            <MobileLeftSide />
          </MediaQuery>
        </>
      )}
    </div>
  );
}

export default Homepage;
