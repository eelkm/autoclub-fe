import LogoutBtn from "../logout_btn/LogoutBtn";
import styles from "./TopSearchBar.module.css";
import { useState } from "react";
import axios from "axios";
import { BackendURL } from "../../../utils/constants";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import UserCard from "../user_card/UserCard";
import { Link } from "react-router-dom";

const TopSearchBar = () => {
  const { token } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [noresults, setNoresults] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);

  const handleSearch = async () => {
    console.log("searching...");
    setLoading(true);
    try {
      const response = await axios.get(
        `${BackendURL}/users/search_users?search_query=${search}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = response.data;

      if (data.success) {
        console.log("Success:", data);
        setResults(data.users);

        if (data.users.length === 0) {
          setNoresults(true);
        }
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (value) => {
    setSearch(value);

    setNoresults(false);

    // Debouncing logic
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const newDebounceTimer = setTimeout(() => {
      if (value) {
        handleSearch();
      } else {
        setResults([]);
        setLoading(false);
      }
    }, 300); // Debauce time is 300ms

    setDebounceTimer(newDebounceTimer);
  };

  return (
    <>
      <div className={styles.search_bar}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <div className={styles.right_side_button}>
          <LogoutBtn />
        </div>

        <div className={styles.results}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            results.map((user) => (
              <div
                key={user.id_user}
                onClick={() => {
                  setResults([]), setSearch("");
                }}
              >
                <Link className={styles.link} to={`/profile/${user.username}`}>
                  <UserCard
                    username={user.username}
                    image={user.p_image_link}
                  />
                </Link>
              </div>
            ))
          )}

          {noresults && <p>No results found.</p>}
        </div>
      </div>
    </>
  );
};

export default TopSearchBar;
