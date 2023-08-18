import {
  faCodeFork,
  faEye,
  faLink,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import { Link, useLocation } from "react-router-dom";
import Header from "../Header";

const ViewRepo = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const repoName = params.get("repo");

  const [repo, setRepo] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [contributors, setContributors] = useState(null);
  const [contributions, setContributions] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isLangLoading, setIsLangLoading] = useState(true);
  const [isContriLoading, setIsContriLoading] = useState(true);

  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${repoName}`,
          {
            headers: {
              Authorization: `token ${accessToken}`,
            },
          }
        );
        const json = await response.json();
        setRepo(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const response = await fetch(
          `https://api.github.com/repos/${repoName}/languages`,
          {
            headers: {
              Authorization: `token ${accessToken}`,
            },
          }
        );
        const json = await response.json();
        const data = [
          ["Language", "Value"],
          ...Object.entries(json).map(([language, value]) => [language, value]),
        ];
        setLanguages(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const response = await fetch(
          `https://api.github.com/repos/${repoName}/contributors`,
          {
            headers: {
              Authorization: `token ${accessToken}`,
            },
          }
        );
        const json = await response.json();
        setContributors(json);

        let contributionData = [["User", "Contribution"]];

        json.map((item, index) => {
          contributionData[index + 1] = [item.login, item.contributions];
        });

        setContributions(contributionData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      setIsProfileLoading(false);
      setIsLangLoading(false);
      setIsContriLoading(false);
    };

    fetchRepoData();
  }, []);

  const options = {
    backgroundColor: "transparent",
    chartArea: { width: "80%", height: "80%" },
  };

  const barOptions = {
    backgroundColor: "transparent",
    chartArea: { width: "80%", height: "80%" },
    legend: { position: "none" },
    axes: {
      x: {
        textPosition: "none",
      },
    },
  };

  return (
    <>
      <Header />
        <div className="min-h-screen flex flex-wrap gap-[20px] p-[20px] mt-[64px]">
          <div className="shadow-md w-full rounded relative">
            {isProfileLoading ? (
              <div className="p-[50px]">
                <div className="w-full flex justify-center items-center text-center pb-6">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                      style={{ fill: "blue" }}
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        dur="0.75s"
                        values="0 12 12;360 12 12"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                </div>
              </div>
            ) : (
              <div className="p-[20px] text-2xl">
                <div className="text-2xl font-semibold">
                  {repo ? repo.full_name : ""}{" "}
                  <Link to={repo ? repo.html_url : ""}>
                    <FontAwesomeIcon icon={faLink} />{" "}
                  </Link>
                </div>
                <div className="grid gap-[10px] mt-[20px]">
                  <div>
                    <FontAwesomeIcon
                      style={{ color: "#eab308" }}
                      icon={faStar}
                    />
                    {` Stars - ${repo ? repo.stargazers_count : null}`}
                  </div>
                  <div>
                    <FontAwesomeIcon
                      style={{ color: "#808080" }}
                      className="mr-[7px]"
                      icon={faCodeFork}
                    />
                    {` Forks - ${repo ? repo.forks_count : null}`}
                  </div>
                  <div>
                    <FontAwesomeIcon
                      style={{ color: "#0ea5e9" }}
                      icon={faEye}
                    />
                    {` Watchers - ${repo ? repo.watchers_count : null}`}
                  </div>
                </div>
                <div className="text-sm mt-[50px]">
                  Contributors
                  <div className="flex flex-wrap gap-[5px] mt-[10px]">
                    {contributors && contributors.length > 0 ? (
                      contributors.map((item) => (
                        <div key={item.login}>
                          <div className="w-[40px] h-[40px] rounded-full bg-[#808080] overflow-hidden">
                            <img
                              className="w-[40px] h-[40px]"
                              src={item.avatar_url}
                            />
                          </div>
                          <div className="absolute top-[40px] opacity-0 hover:opacity-100 pt-[40px]">
                            <div className="bg-[#f8f8f8] shadow-md py-[2px] px-[5px]">
                              {item.login}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="shadow-md w-full h-[400px] rounded flex justify-center items-center overflow-hidden">
            <div className="text-center pt-[50px] text-xl">
              Languages
              {isLangLoading ? (
                <div className="w-full flex justify-center items-center text-center pb-6">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                      style={{ fill: "blue" }}
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        dur="0.75s"
                        values="0 12 12;360 12 12"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                </div>
              ) : (
                <Chart
                  chartType="PieChart"
                  data={languages}
                  width={"400px"}
                  height={"350px"}
                  options={options}
                />
              )}
            </div>
          </div>
          <div className="shadow-md w-full h-[400px] rounded flex justify-center items-center p-[20px] overflow-hidden">
            <div className="text-center text-xl w-full grid gap-[40px]">
              Contributions
              {isContriLoading ? (
                <div className="w-full flex justify-center items-center text-center pb-6">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                      style={{ fill: "blue" }}
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        dur="0.75s"
                        values="0 12 12;360 12 12"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                </div>
              ) : (
                <Chart
                  chartType="Bar"
                  data={contributions}
                  width={"100%"}
                  height={"250px"}
                  options={barOptions}
                />
              )}
            </div>
          </div>
        </div>
    </>
  );
};

export default ViewRepo;
