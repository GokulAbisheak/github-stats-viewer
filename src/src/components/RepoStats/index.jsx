import { faCodeFork, faEye, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';
import { useLocation } from 'react-router';

const RepoStats = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get('username');

    const accessToken = import.meta.env.VITE_ACCESS_TOKEN

    const [repoData, setRepoData] = useState(null);
    const [starCount, setStarCount] = useState();
    const [watcherCount, setWatcherCount] = useState();
    const [forkCount, setForkCount] = useState();
    const [barData, setBarData] = useState(null);

    useEffect(() => {
        const fetchRepoData = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${userId}/repos`, {
                    headers: {
                        Authorization: `token ${accessToken}`,
                    }
                });
                const json = await response.json();
                setRepoData(json);

                let stars = 0;
                let forks = 0;
                let watchers = 0;

                const fetchData = json.map((repo) => {
                    stars = stars + repo.stargazers_count;
                    forks = forks + repo.forks_count;
                    watchers = watchers + repo.watchers_count;
                })

                await Promise.all(fetchData);

                setStarCount(stars);
                setWatcherCount(watchers);
                setForkCount(forks);

                const data = [
                    ['', 'Count'],
                    ['Stars', stars],
                    ['Forks', forks],
                    ['Watchers', watchers]
                ]

                await Promise.all(data);

                setBarData(data);
                console.log(data)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchRepoData();
    }, []);

    const options = {
        width: 400,
        height: 300,
        bars: "vertical",
        legend: { position: "none" },
        colors: '#0ea5e9'
    };

    return (
        <>
            <div className='box'>
                <h3>Repository Stats</h3>
                {starCount ? (
                    barData ? (
                        <>
                            <p><FontAwesomeIcon style={{ color: '#eab308' }} icon={faStar} /> Stars - {starCount}</p>
                            <p><FontAwesomeIcon style={{ color: '#808080' }} icon={faCodeFork} /> Forks - {forkCount}</p>
                            <p><FontAwesomeIcon style={{ color: '#0ea5e9' }} icon={faEye} /> Watchers - {watcherCount}</p>

                            <Chart
                                chartType="Bar"
                                data={barData}
                                options={options} />
                        </>
                    ) : (
                        <div className='center' style={{ paddingBottom: '20px' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z" style={{ fill: "blue" }}>
                                    <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" />
                                </path>
                            </svg>
                        </div>
                    )
                ) : (
                    <div className='center' style={{ paddingBottom: '20px' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z" style={{ fill: "blue" }}>
                                <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" />
                            </path>
                        </svg>
                    </div>
                )}
            </div >
        </>
    );
}

export default RepoStats;
