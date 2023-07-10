import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const [userData, setUserData] = useState(null);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get('username');

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

    return (
        <>
            <div className='flex'>
                <div className='flex text-left items-center'>
                    {userData ? (
                        userData.login ? (
                            <>
                                <div className='w-48 h-48 rounded-full mr-12 overflow-hidden'>
                                    <img src={userData.avatar_url} />
                                </div>
                                <div className=''>
                                    <h1 className='text-2xl font-medium'>{userData.name}</h1>
                                    <p>{userData.login}</p>
                                    <br />
                                    <p className='italic'>{userData.bio}</p>
                                    <br />
                                    <div className='text-gray-500'>
                                        <FontAwesomeIcon icon={faUsers} /> {` ${userData.followers} Followers | ${userData.following} Following`}
                                    </div>
                                </div>

                            </>
                        ) : (
                            <>
                                <div className='pb-6'>
                                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z" style={{ fill: "blue" }}>
                                            <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" />
                                        </path>
                                    </svg>
                                </div>
                            </>
                        )) : (
                        <>
                            <div className='w-full flex content-center justify-center text-center' style={{ paddingBottom: '20px' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z" style={{ fill: "blue" }}>
                                        <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" />
                                    </path>
                                </svg>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Profile;
