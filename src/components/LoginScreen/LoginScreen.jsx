import styles from './LoginScreen.module.css';
import { useState, useEffect } from 'react';
import { WALLPAPERS } from '../../config/wallpapers';
const LoginScreen = ({ screen, onSignIn }) => {
  const [bgPath, setBgPath] = useState('');
  useEffect(() => {
    const index = Math.floor(Math.random() * WALLPAPERS.length);
    setBgPath(`${import.meta.env.BASE_URL}${WALLPAPERS[index]}`);
  }, []);
  const profilePath = `${import.meta.env.BASE_URL}profile2.jpg`;

  return (
    <div
      className={styles['login-container']}
      style={{ backgroundImage: `url(${bgPath})` }}
    >
      <div className={styles['login-blur-overlay']} />

      <div className={styles['login-content']}>
        <div className={styles['avatar-container']}>
          <img src={profilePath} alt="Profile" className={styles['profile-image']} />
        </div>
        <h1 className={styles['user-name']}>Ashmeet Singh</h1>

        <div className={styles['action-container']}>
          {screen === 'login' && (
            <button className={styles['sign-in-button']} onClick={onSignIn}>
              Sign In
            </button>
          )}

          {screen === 'loading' && (
            <div className={styles['loader-container']}>
              <div className={styles['windows-spinner']} />
              <p className={styles['loading-text']}>Welcome</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
