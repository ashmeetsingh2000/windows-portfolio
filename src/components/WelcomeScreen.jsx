import React from 'react';
import './WelcomeScreen.css';

const WelcomeScreen = ({ appState, onSignIn }) => {
  // Base URL resolution for GitHub Pages compatability
  const bgPath = `${import.meta.env.BASE_URL}bgimage2.jpg`;
  const profilePath = `${import.meta.env.BASE_URL}profile2.jpg`;

  return (
    <div
      className="welcome-container"
      style={{ backgroundImage: `url(${bgPath})` }}
    >
      <div className="background-overlay"></div>

      <div className="login-screen">
        <div className="avatar-container">
          <img src={profilePath} alt="Profile" className="profile-image" />
        </div>
        <h1 className="user-name">Ashmeet Singh</h1>

        <div className="action-container">
          {appState === 'initial' && (
            <button className="sign-in-button" onClick={onSignIn}>
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
    </div>
  );
};

export default WelcomeScreen;
