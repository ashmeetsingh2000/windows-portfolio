import React, { useState } from 'react';
import './WelcomeScreen.css';

const WelcomeScreen = () => {
  // states: 'initial', 'loading', 'entered'
  const [appState, setAppState] = useState('initial');

  const handleSignIn = () => {
    setAppState('loading');
    setTimeout(() => {
      setAppState('entered');
    }, 2000);
  };

  // Base URL resolution for GitHub Pages compatability
  const bgPath = `${import.meta.env.BASE_URL}bgimage.jpg`;
  const profilePath = `${import.meta.env.BASE_URL}profile.jpg`;

  return (
    <div 
      className={`welcome-container state-${appState}`}
      style={{ backgroundImage: `url(${bgPath})` }}
    >
      <div className="background-overlay"></div>
      
      {appState !== 'entered' ? (
        <div className="login-screen">
          <div className="avatar-container">
            <img src={profilePath} alt="Profile" className="profile-image" />
          </div>
          <h1 className="user-name">Ashmeet Singh</h1>
          
          <div className="action-container">
            {appState === 'initial' && (
              <button className="sign-in-button" onClick={handleSignIn}>
                Sign In
              </button>
            )}
            
            {appState === 'loading' && (
              <div className="loader-container">
                <div className="windows-spinner"></div>
                <p className="loading-text">Welcome</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="desktop-screen fade-in">
          <h1 className="desktop-hello">Hello</h1>
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;
