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
      <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b to-blue-300 from-blue-100">
        <div className="text-3xl font-semibold text-blue-700">
          {`<Github Stats Viewer />`}
        </div>
        <div className="text-xl text-blue-700 mb-[100px]">
          Enter Username to View Dynamic Stats
        </div>
        <div className="border-2 border-blue-700 items-stretch text-2xl rounded bg-white">
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
