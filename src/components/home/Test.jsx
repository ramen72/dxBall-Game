import React, { useEffect, useState } from 'react';

const Test = () => {
    const canvasWidth = 800;
    const canvasHeight = 600;

    const initialBall = { x: 400, y: 550, dx: 4, dy: -4, radius: 10 };
    const initialPaddle = { width: 100, height: 10, x: 350, y: 580, speed: 8 };

    const brickRowCount = 5;
    const brickColumnCount = 9;
    const brickWidth = 75;
    const brickHeight = 20;
    const brickPadding = 10;
    const brickOffsetTop = 30;
    const brickOffsetLeft = 35;

    const createBricks = () => {
        const b = [];
        for (let c = 0; c < brickColumnCount; c++) {
            b[c] = [];
            for (let r = 0; r < brickRowCount; r++) {
                b[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
        return b;
    };

    const [ball, setBall] = useState(initialBall);
    const [paddle, setPaddle] = useState(initialPaddle);
    const [bricks, setBricks] = useState(createBricks());
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [gameOver, setGameOver] = useState(false);
    const [keys, setKeys] = useState({ left: false, right: false });

    useEffect(() => {
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        const drawBricks = () => {
            bricks.forEach((col, c) =>
                col.forEach((brick, r) => {
                    if (brick.status === 1) {
                        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                        brick.x = brickX;
                        brick.y = brickY;
                        ctx.beginPath();
                        ctx.rect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = '#f00';
                        ctx.fill();
                        ctx.closePath();
                    }
                })
            );
        };

        const drawBall = () => {
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.closePath();
        };

        const drawPaddle = () => {
            ctx.beginPath();
            ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
            ctx.fillStyle = '#0f0';
            ctx.fill();
            ctx.closePath();
        };

        const collisionDetection = () => {
            bricks.forEach((col, c) =>
                col.forEach((brick, r) => {
                    if (brick.status === 1) {
                        if (
                            ball.x > brick.x &&
                            ball.x < brick.x + brickWidth &&
                            ball.y > brick.y &&
                            ball.y < brick.y + brickHeight
                        ) {
                            brick.status = 0;
                            setBall(prev => ({ ...prev, dy: -prev.dy }));
                            setScore(prev => {
                                const newScore = prev + 10;
                                if (newScore === brickRowCount * brickColumnCount * 10) {
                                    alert('You Win!');
                                    resetGame();
                                }
                                return newScore;
                            });
                        }
                    }
                })
            );
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            drawBricks();
            drawBall();
            drawPaddle();
            collisionDetection();

            // Move ball
            let newBall = { ...ball };
            newBall.x += newBall.dx;
            newBall.y += newBall.dy;

            if (newBall.x + newBall.radius > canvasWidth || newBall.x - newBall.radius < 0) {
                newBall.dx = -newBall.dx;
            }
            if (newBall.y - newBall.radius < 0) {
                newBall.dy = -newBall.dy;
            }

            if (
                newBall.y + newBall.radius > paddle.y &&
                newBall.x > paddle.x &&
                newBall.x < paddle.x + paddle.width
            ) {
                newBall.dy = -newBall.dy;
            }

            if (newBall.y + newBall.radius > canvasHeight) {
                const newLives = lives - 1;
                setLives(newLives);
                if (newLives === 0) {
                    setGameOver(true);
                    return;
                } else {
                    newBall = { ...initialBall };
                    setPaddle({ ...initialPaddle });
                }
            }

            setBall(newBall);

            // Move paddle
            let newPaddle = { ...paddle };
            if (keys.right && newPaddle.x < canvasWidth - newPaddle.width) {
                newPaddle.x += newPaddle.speed;
            }
            if (keys.left && newPaddle.x > 0) {
                newPaddle.x -= newPaddle.speed;
            }
            setPaddle(newPaddle);

            if (!gameOver) requestAnimationFrame(draw);
        };

        draw();
    }, [ball, paddle, keys, gameOver]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') setKeys(prev => ({ ...prev, left: true }));
            if (e.key === 'ArrowRight') setKeys(prev => ({ ...prev, right: true }));
            if ((e.key === 'r' || e.key === 'R') && gameOver) resetGame();
        };

        const handleKeyUp = (e) => {
            if (e.key === 'ArrowLeft') setKeys(prev => ({ ...prev, left: false }));
            if (e.key === 'ArrowRight') setKeys(prev => ({ ...prev, right: false }));
        };

        const handleMouseMove = (e) => {
            const rect = document.getElementById('gameCanvas').getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            if (relativeX > 0 && relativeX < canvasWidth) {
                setPaddle(prev => ({ ...prev, x: relativeX - prev.width / 2 }));
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [gameOver]);

    const resetGame = () => {
        setScore(0);
        setLives(3);
        setBall(initialBall);
        setPaddle(initialPaddle);
        setBricks(createBricks());
        setGameOver(false);
    };

    return (
        <div style={{ textAlign: 'center', backgroundColor: '#222', height: '100vh', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', color: 'white', left: 10, top: 10 }}>Score: {score}</div>
            <div style={{ position: 'absolute', color: 'white', right: 10, top: 10 }}>Lives: {lives}</div>
            {gameOver && (
                <div style={{ position: 'absolute', color: 'red', fontSize: 40, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    Game Over! Press R to Restart
                </div>
            )}
            <canvas
                id="gameCanvas"
                width={canvasWidth}
                height={canvasHeight}
                style={{ border: '2px solid white', backgroundColor: '#000' }}
            />
        </div>
    );
};

export default Test;