import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  const [searchUser, setSearchUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    window.location.href = `/user/?username=${searchUser}`;
  };

  return (
    <>
      <div className="flex justify-between items-center w-full h-16 px-4 shadow-md fixed top-0 bg-white shadow z-50">
        <Link to="/">
          <div className="justify-between text-md md:text-xl text-blue-700 font-bold">
            GitHub Stats Viewer
          </div>
        </Link>
        <div className="justify-between">
          <form onSubmit={handleSubmit}>
            <div className="border-2 border-blue-700 rounded py-2 px-4">
              <input
                placeholder="Enter Username"
                type="text"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                className="outline-0 max-w-[100px] md:max-w-[150px] text-xs md:text-md"
              />
              <button className="text-blue-700" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Header;
