import React from 'react';
import DxBallGame from '../components/home/DxBallGame';

const HomePage = () => {
    return (
        <>
            <div className="h-screen bg-[#222] border flex arial justify-center items-center">
                <DxBallGame/>
            </div>
        </>
    );
};

export default HomePage;