import React from "react";
import LanguageStats from "./LanguageStats";
import Header from "./Header";
import Profile from "./Profile";
import RepoStats from "./RepoStats";
import Repos from "./Repos";

const Components = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-stretch mt-[64px]">
        <div className="flex text-center py-12 shadow-md rounded w-full justify-center m-4">
          <Profile />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-stretch p-4 lg:p-0 lg:mt-4">
        <div className="flex text-center p-4 shadow-md rounded w-full justify-center mb-8 lg:mx-4">
          <LanguageStats />
        </div>
        <div className="flex text-center p-4 shadow-md rounded w-full justify-center mb-8 lg:mx-4">
          <RepoStats />
        </div>
      </div>
      <div className="flex justify-center items-stretch">
        <div className="p-12 shadow-md rounded w-full justify-center m-4">
          <Repos />
        </div>
      </div>
    </>
  );
};

export default Components;
