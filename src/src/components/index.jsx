import React from 'react';
import LanguageStats from './LanguageStats';
import Header from './Header';
import Profile from './Profile';
import RepoStats from './RepoStats';

const Components = () => {
    return (
        <>
            <Header />
            <div className='flex justify-center items-stretch'>
                <div className='flex text-center py-12 shadow-md rounded w-full justify-center m-4'>
                    <Profile />
                </div>
            </div>
            <div className='flex justify-center items-stretch'>
                <div className='flex text-center p-4 shadow-md rounded w-full justify-center m-4'>
                    <LanguageStats />
                </div>
                <div className='flex text-center p-4 shadow-md rounded w-full justify-center m-4'>
                    <RepoStats />
                </div>
            </div >
        </>
    );
}

export default Components;
