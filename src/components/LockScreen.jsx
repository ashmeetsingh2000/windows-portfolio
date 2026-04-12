import { useState, useEffect, useRef } from 'react';
import './LockScreen.css';

const LockScreen = ({ onUnlock, isActive }) => {
  const [time, setTime] = useState(new Date());
  const timerRef = useRef(null);

  // Only run the clock when this screen is active
  useEffect(() => {
    if (isActive) {
      // Sync to the start of the next second for smooth ticking
      setTime(new Date());
      timerRef.current = setInterval(() => {
        setTime(new Date());
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [isActive]);

  // Keyboard listener — only when active
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = () => onUnlock();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, onUnlock]);

  const bgPath = `${import.meta.env.BASE_URL}bgimage2.jpg`;

  const timeString = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const dateString = time.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className="lock-container"
      style={{ backgroundImage: `url(${bgPath})` }}
      onClick={onUnlock}
    >
      <div className="lock-clock">
        <h1 className="lock-time">{timeString}</h1>
        <h2 className="lock-date">{dateString}</h2>
      </div>
    </div>
  );
};

export default LockScreen;
