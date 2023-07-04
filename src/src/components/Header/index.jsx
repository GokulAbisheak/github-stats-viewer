import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const Header = () => {

    const [searchUser, setSearchUser] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        window.location.href = `/?username=${searchUser}`;
    }

    return (
        <>
            <div className='flex-between h-64px padding-x-md shadow-md header'>
                <div className='flex-between text-18 blue-text bold'>
                    GitHub Stats Viewer
                </div>
                <div className='flex-between'>
                    <form onSubmit={handleSubmit}>
                        <div className='search-bar'>
                            <input placeholder='Enter Username' type="text" value={searchUser} onChange={(e) => setSearchUser(e.target.value)} />
                            <input type="submit" value="🔎︎" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Header;
