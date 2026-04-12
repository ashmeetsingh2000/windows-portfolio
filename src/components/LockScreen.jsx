import React, { useState, useEffect } from 'react';
import './LockScreen.css';

const LockScreen = ({ onUnlock }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    // Listen for any key press to unlock
    const handleKeyDown = () => onUnlock();
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onUnlock]);

  const bgPath = `${import.meta.env.BASE_URL}bgimage2.jpg`;

  const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div 
      className="lock-container"
      style={{ backgroundImage: `url(${bgPath})` }}
      onClick={onUnlock}
    >
      <div className="lock-clock fade-in">
        <h1 className="lock-time">{timeString}</h1>
        <h2 className="lock-date">{dateString}</h2>
      </div>
    </div>
  );
};

export default LockScreen;
