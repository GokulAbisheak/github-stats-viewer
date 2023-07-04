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
            <div className='padding-x-md'>
                <div className='left'>
                    {userData ? (
                        <>
                            <div className='profile-div margin-right-xl'>
                                <img src={userData.avatar_url} />
                            </div>
                            <div className='profile-text'>
                                <h1>{userData.name}</h1>
                                <p>{userData.login}</p>
                                <br />
                                <p className='italic'>{userData.bio}</p>
                                <br />
                                <div className='text-grey'>
                                    <FontAwesomeIcon icon={faUsers} /> {` ${userData.followers} Followers | ${userData.following} Following`}
                                </div>
                            </div>

                        </>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Profile;
