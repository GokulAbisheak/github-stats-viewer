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

const ViewRepo = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const repoName = params.get("repo");

  const [repo, setRepo] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [contributors, setContributors] = useState(null);
  const [contributions, setContributions] = useState(null);

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
      <div>
        <div className="min-h-screen flex flex-wrap gap-[20px] p-[20px]">
          <div className="shadow-md w-full rounded relative">
            <div className="p-[20px] text-2xl">
              <div className="text-2xl font-semibold">
                {repo ? repo.full_name : ""}{" "}
                <Link to={repo ? repo.html_url : ""}>
                  <FontAwesomeIcon icon={faLink} />{" "}
                </Link>
              </div>
              <div className="grid gap-[10px] mt-[20px]">
                <div>
                  <FontAwesomeIcon style={{ color: "#eab308" }} icon={faStar} />
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
                  <FontAwesomeIcon style={{ color: "#0ea5e9" }} icon={faEye} />
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
          </div>
          <div className="shadow-md w-full h-[400px] rounded flex justify-center items-center overflow-hidden">
            <div className="text-center pt-[50px] text-xl">
              Languages
              <Chart
                chartType="PieChart"
                data={languages}
                width={"400px"}
                height={"350px"}
                options={options}
              />
            </div>
          </div>
          <div className="shadow-md w-full h-[400px] rounded flex justify-center items-center p-[20px] overflow-hidden">
            <div className="text-center text-xl w-full grid gap-[40px]">
              Contributions
              <Chart
                chartType="Bar"
                data={contributions}
                width={"100%"}
                height={"250px"}
                options={barOptions}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewRepo;
