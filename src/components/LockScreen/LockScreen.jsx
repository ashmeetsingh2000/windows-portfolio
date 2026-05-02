import { useState, useEffect, useRef } from 'react';
import styles from './LockScreen.module.css';
import { WALLPAPERS } from '../../config/wallpapers';

const LockScreen = ({ onUnlock, isActive }) => {
  const [time, setTime] = useState(new Date());
  const timerRef = useRef(null);
  const [bgPath, setBgPath] = useState('');

  useEffect(() => {
    const index = Math.floor(Math.random() * WALLPAPERS.length);
    setBgPath(`${import.meta.env.BASE_URL}${WALLPAPERS[index]}`);
  }, []);

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


  const timeString = time.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const dateString = time.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className={styles['lock-container']}
      style={{ backgroundImage: `url(${bgPath})` }}
      onClick={onUnlock}
    >
      <div className={styles['lock-clock']}>
        <h1 className={styles['lock-time']}>{timeString}</h1>
        <h2 className={styles['lock-date']}>{dateString}</h2>
      </div>
    </div>
  );
};

export default LockScreen;
