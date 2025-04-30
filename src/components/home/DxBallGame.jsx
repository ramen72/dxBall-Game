import React, { useEffect, useState } from 'react';

const DxBallGame = () => {
    const [isGameOver, setIsGameOver] = useState(false)

    // Game objects
    let ball = {
        x: 800 / 2,
        y: 600 - 50,
        radius: 10,
        dx: 4,
        dy: -4
    };

    let paddle = {
        width: 100,
        height: 10,
        x: 800 / 2 - 50,
        y: 600 - 20,
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

    let score = 0;
    let lives = 3;
    let rightPressed = false;
    let leftPressed = false;
    let gameOver = false;

    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

     // Event listeners
    //  document.addEventListener('keydown', keyDownHandler);
    //  document.addEventListener('keyup', keyUpHandler);
    //  document.addEventListener('mousemove', mouseMoveHandler);

     function keyDownHandler(e) {
         if (e.key === 'Right' || e.key === 'ArrowRight') rightPressed = true;
         if (e.key === 'Left' || e.key === 'ArrowLeft') leftPressed = true;
         if (e.key === 'r' || e.key === 'R') {
             if (gameOver) resetGame();
         }
     }

     function keyUpHandler(e) {
         if (e.key === 'Right' || e.key === 'ArrowRight') rightPressed = false;
         if (e.key === 'Left' || e.key === 'ArrowLeft') leftPressed = false;
     }

     useEffect(()=>{
         function mouseMoveHandler(e) {
            //  const relativeX = e.clientX - canvas.offsetLeft;
            //  if (relativeX > 0 && relativeX < canvas.width) {
            //      paddle.x = relativeX - paddle.width / 2;
            //  }
         }
     },[])

    
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