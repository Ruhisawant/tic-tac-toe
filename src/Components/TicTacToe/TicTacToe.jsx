import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const initialData = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
    const [data, setData] = useState(initialData);
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const titleRef = useRef(null);
    const boxRefs = useRef(Array.from({ length: 9 }, () => React.createRef()));

    const toggle = (e, num) => {
        if (lock || data[num] !== "") return;

        const newData = [...data];
        newData[num] = count % 2 === 0 ? "x" : "o";
        setData(newData);
        setCount(count + 1);
        checkWin(newData);
    };

    const checkWin = (data) => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                won(data[a]);
                return;
            }
        }
    };

    const won = (winner) => {
        setLock(true);
        titleRef.current.innerHTML = `Congratulations: <img src=${winner === "x" ? cross_icon : circle_icon} alt=${winner}>`;
    };

    const reset = () => {
        setLock(false);
        setData(initialData);
        setCount(0);
        titleRef.current.innerHTML = 'Tic Tac Toe';
    };

    return (
        <div className='container'>
            <h1 className="title" ref={titleRef}>Tic Tac Toe</h1>
            <div className="board">
                {data.map((value, index) => (
                    <div
                        key={index}
                        className="boxes"
                        ref={boxRefs.current[index]}
                        onClick={(e) => toggle(e, index)}
                    >
                        {value && <img src={value === "x" ? cross_icon : circle_icon} alt={value} />}
                    </div>
                ))}
            </div>
            <button className="reset" onClick={reset}>Reset</button>
        </div>
    );
};

export default TicTacToe;