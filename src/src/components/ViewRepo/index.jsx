import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ViewRepo = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const repoName = params.get("repo");

  const [repo, setRepo] = useState(null);

  const accessToken = import.meta.env.VITE_ACCESS_TOKEN

    useEffect(() => {
        const fetchRepoData = async () => {
            try {
                const response = await fetch(`https://api.github.com/repos/${repoName}`, {
                    headers: {
                        Authorization: `token ${accessToken}`,
                    }
                });
                const json = await response.json();
                setRepo(json);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchRepoData();
    }, []);

  return (
    <>
      <div>
        {repo ? repo.full_name : ''}
      </div>
    </>
  );
};

export default ViewRepo;
