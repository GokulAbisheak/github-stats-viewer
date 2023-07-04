import React from 'react';
import LanguageStats from './LanguageStats';
import Header from './Header';
import Profile from './Profile';

const Components = () => {
    return (
        <>
            <Header />
            <div className='grid-container-1'>
                <div className='grid-item'>
                    <Profile />
                </div>
            </div>
            <div className='grid-container-2'>
                <div className='grid-item'>
                    <LanguageStats />
                </div>
            </div >
        </>
    );
}

export default Components;
