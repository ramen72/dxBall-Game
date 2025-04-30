import React, { useState } from 'react';

const DxBallGame = () => {
    const [isGameOver, setIsGameOver] = useState(false)

    // Game objects
    let ball = {
        x: canvas.width / 2,
        y: canvas.height - 50,
        radius: 10,
        dx: 4,
        dy: -4
    };

    let paddle = {
        width: 100,
        height: 10,
        x: canvas.width / 2 - 50,
        y: canvas.height - 20,
        speed: 8
    };

    let bricks = [];
    const brickRowCount = 5;
    const brickColumnCount = 9;
    const brickWidth = 75;
    const brickHeight = 20;
    const brickPadding = 10;
    const brickOffsetTop = 30;
    const brickOffsetLeft = 35;

    
    return (
        <>
            <div id="score" className='absolute top-3 left-3 text-white text-lg font-bold capitalize'>Score: 0</div>
            <div id="lives" className='absolute top-3 right-3 text-white text-lg font-bold capitalize'>Lives: 3</div>
            {
                isGameOver &&
                <div id="gameOver" className='absolute text-red-700 text-5xl font-bold'>Game Over! Press R to Restart</div>
            }
            <canvas id="gameCanvas" width="800" height="600" className='border-2 bg-black'></canvas>
        </>
    );
};

export default DxBallGame;