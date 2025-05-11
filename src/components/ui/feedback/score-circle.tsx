import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ScoreCircleProps {
    score: number;
    maxScore: number;
}

export default function ScoreCircle({ score, maxScore }: ScoreCircleProps) {
    const percentage = (score / maxScore) * 100;

    let pathColor;
    if (percentage < 50) {
        pathColor = 'red';
    } else if (percentage < 70) {
        pathColor = 'yellow';
    } else {
        pathColor = 'green';
    }

    return (
        <div style={{ width: 70, height: 70, fontFamily:'titillium-web' , fontWeight:'600' , letterSpacing: '0.05em' , lineHeight: '26px' , fontSize: '12px' }}>
            <CircularProgressbar
                value={percentage}
                text={`${score} / ${maxScore}`}
                styles={buildStyles({
                    textColor: 'black',
                    pathColor: pathColor,
                    trailColor: "#d6d6d6",
                    
                })}
            />
        </div>
    );
}
