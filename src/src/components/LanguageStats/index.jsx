import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Chart } from 'react-google-charts'

const LanguageStats = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get('username');

    const [username, setUsername] = useState(params.get('username'));
    const [userData, setUserData] = useState(null);
    const [repoData, setRepoData] = useState(null);
    const [languages, setLanguages] = useState(null);
    const [sortedLanguages, setSortedLanguages] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const accessToken = import.meta.env.VITE_ACCESS_TOKEN

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${userId}`, {
                    headers: {
                        Authorization: `token ${accessToken}`,
                    }
                });
                const json = await response.json();
                setUserData(json);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUserData();
    }, []);

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

                let language = [];
                const fetchLanguageData = json.map(async (repo) => {
                    const response = await fetch(repo.languages_url, {
                        headers: {
                            Authorization: `token ${accessToken}`,
                        }
                    });
                    const json = await response.json();
                    language.push(json)
                })

                await Promise.all(fetchLanguageData);

                setLanguages(language);

                const total = {};

                language.forEach((set) => {
                    Object.keys(set).forEach((key) => {
                        total[key] = (total[key] || 0) + set[key];
                    });
                });

                const totalArray = Object.entries(total);
                totalArray.sort((a, b) => b[1] - a[1]);

                const chartData = [['Key', 'Value']];
                totalArray.forEach(([key, value]) => {
                    chartData.push([key, value]);
                });

                setSortedLanguages(chartData)
                setIsLoading(false)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchRepoData();
    }, []);

    const options = {
        pieStartAngle: 100,
        pieSliceText: 'none',
        legend: {
            position: 'bottom',
            textStyle: {
                color: 'blue',
                fontSize: 12
            }
        },
        chartArea: {
            left: 0,
            top: 0,
            right: 0,
        },
        backgroundColor: {
            fill: 'transparent'
        }
    };

    return (
        <>
            <div className='text-center max-w-96 pt-12'>
                <h3 className='text-xl font-normal'>Most Used Languages</h3>

                {isLoading ? (
                    <div className='flex w-full justify-center items-center text-center pb-6'>
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z" style={{ fill: "blue" }}>
                                <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" />
                            </path>
                        </svg>
                    </div>
                ) : (
                    sortedLanguages ? (
                        <>
                            <br />
                            <br />
                            <Chart
                                chartType="PieChart"
                                data={sortedLanguages}
                                width="400px"
                                height="400px"
                                options={options}
                            />
                        </>
                    ) : (
                        <p className='text-blue-700'>Not enough data</p>
                    )
                )}
            </div>
        </>
    );
}

export default LanguageStats;
