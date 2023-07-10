import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [userName, setUserName] = useState("");

  const handleClick = () => {
    window.location = `/user/?username=${userName}`;
  };

  return (
    <>
      <Header />
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="border-2 border-blue-700 items-stretch text-2xl rounded">
          <input
            type="text"
            className="p-4 outline-0"
            placeholder="Enter Username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <button className="p-4 text-blue-700" onClick={handleClick}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
