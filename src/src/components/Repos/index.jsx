import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faEye,
  faLink,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const Repos = () => {
  const [repoData, setRepoData] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [max, setMax] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get("username");

  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${userId}/repos?per_page=${perPage}&page=${pageNo}`,
          {
            headers: {
              Authorization: `token ${accessToken}`,
            },
          }
        );
        const json = await response.json();
        setRepoData(json);

        if (json.length === 0) {
          setMax(true);
          setPageNo(pageNo-1)
        } else {
          setMax(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRepoData();
  }, [pageNo, perPage]);

  const pagePrev = () => {
    setPageNo(pageNo - 1);
  };

  const pageNext = () => {
    setPageNo(pageNo + 1);
  };

  const changeRepoCount = (count) => {
    setPageNo(1);
    setPerPage(count);
  };

  return (
    <>
      <div className="w-full flex justify-center text-center mb-8 text-3xl">
        Repositories
      </div>
      <div class="w-full flex flex-col justify-center text-center mb-8">
        <input
          type="range"
          min="1"
          max="12"
          className="w-96 mx-auto range accent-blue-700"
          value={perPage}
          onChange={(e) => {
            changeRepoCount(e.target.value);
          }}
        />
        {`Limit repositories per page : ${perPage}`}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {repoData ? (
          repoData.map((repo) => (
            <a href={`/repos/?repo=${repo.full_name}`}>
              <div className="min-w-80 h-full bg-white text-neutral-900 p-5 new-shadow-md rounded border-2 border-blue-700 hover:scale-105 transition duration-200 ease-in-out shadow-md">
                <div className="lexend-bold flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full overflow-hidden mr-4">
                    <img src={repo.owner.avatar_url} className="contain" />
                  </div>
                  {repo.owner.login}
                </div>
                <div className="lexend-light mb-4">
                  {repo.name}
                  <a href={repo.html_url} target="_blank" className="ml-2">
                    <FontAwesomeIcon className="text-blue-500" icon={faLink} />
                  </a>
                  <span
                    className={
                      "float-right px-4 py-1 text-white rounded-full text-sm capitalize ml-4 " +
                      (repo.visibility == "public"
                        ? "bg-lime-600"
                        : "bg-red-700")
                    }
                  >
                    {repo.visibility}
                  </span>
                </div>
                <div className="lexend-light">
                  <FontAwesomeIcon className="text-amber-400" icon={faStar} />{" "}
                  Stars - {repo.stargazers_count}
                </div>
                <div className="lexend-light">
                  <FontAwesomeIcon className="text-sky-600" icon={faEye} />{" "}
                  Watchers - {repo.watchers_count}
                </div>
                <div className="mt-4">
                  {repo.language != null ? (
                    <span className="lexend-bold text-sm bg-blue-700 px-2 py-1 rounded-full text-neutral-50">
                      {repo.language}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </a>
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="flex items-center w-full justify-center m-8 mb-0">
        <button
          onClick={() => {
            pagePrev();
          }}
          disabled={pageNo === 1 ? true : false}
          className="disabled:opacity-50"
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="text-3xl text-blue-700"
          />
        </button>
        <div className="text-2xl mx-8">{pageNo}</div>
        <button
          onClick={() => {
            pageNext();
          }}
          disabled={max === true ? true : false}
          className="disabled:opacity-50"
        >
          <FontAwesomeIcon
            icon={faAngleRight}
            className="text-3xl text-blue-700"
          />
        </button>
      </div>
    </>
  );
};

export default Repos;
