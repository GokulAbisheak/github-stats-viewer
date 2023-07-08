import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const [userName, setUserName] = useState('');

    const handleClick = () => {

        window.location = `/user/?username=${userName}`
    }

    return (
        <>
            <Header />
            <div className='mid'>
                <div>
                    Find GitHub Stats
                </div>
                <div className='search-bar-center'>
                    <input type='text' placeholder='Enter Username' onChange={(e) => { setUserName(e.target.value) }} />
                    <button onClick={handleClick}><FontAwesomeIcon icon={faSearch} /></button>
                </div>
            </div>
        </>
    );
}

export default Home;
