import React, { useState, useEffect } from 'react';
import './countdown.scss'

function CountDown(props) {
  const [timeLeft, setTimeLeft] = useState(props.time);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft - hours * 3600) / 60);
  const seconds = timeLeft - hours * 3600 - minutes * 60;

  return (
    <div className='countdown-contain'>
      <p>{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</p>
    </div>
  );
}

export default CountDown;