import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {

    const [searchUser, setSearchUser] = useState('');
    const url = useLocation();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        window.location.href = `/?username=${searchUser}`;
    }

    return (
        <>
            <div className='flex-between h-64px padding-x-md shadow-md'>
                <div className='flex-between text-18 blue-text bold'>
                    GitHub Stats Viewer
                </div>
                <div className='flex-between'>
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={searchUser} onChange={(e) => setSearchUser(e.target.value)} />
                        <input type="submit" value="Search" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default Header;
