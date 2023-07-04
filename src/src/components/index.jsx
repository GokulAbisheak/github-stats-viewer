import React from 'react';
import LanguageStats from './LanguageStats';
import Header from './Header';
import Profile from './Profile';
import RepoStats from './RepoStats';

const Components = () => {
    return (
        <>
            <Header />
            <div className='flex'>
                <div className='flex-item'>
                    <Profile />
                </div>
            </div>
            <div className='flex'>
                <div className='flex-item'>
                    <LanguageStats />
                </div>
                <div className='flex-item'>
                    <RepoStats />
                </div>
            </div >
        </>
    );
}

export default Components;
