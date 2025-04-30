import React from 'react';
import Test from '../components/home/Test';
import DXBallGame from './../components/home/DXBallGameTwo';
import DxBallGame from './../components/home/DxBallGame';

const HomePage = () => {
    return (
        <>
            <div className="h-screen bg-[#222] border flex arial justify-center items-center">
                <DxBallGame/>
                {/* <DXBallGame/> */}
                {/* <Test/> */}
                {/* <DXBallGame/> */}
            </div>
        </>
    );
};

export default HomePage;