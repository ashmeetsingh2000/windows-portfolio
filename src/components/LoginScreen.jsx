import './LoginScreen.css';

const LoginScreen = ({ screen, onSignIn }) => {
  const bgPath = `${import.meta.env.BASE_URL}bgimage2.jpg`;
  const profilePath = `${import.meta.env.BASE_URL}profile2.jpg`;

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${bgPath})` }}
    >
      <div className="login-blur-overlay" />

      <div className="login-content">
        <div className="avatar-container">
          <img src={profilePath} alt="Profile" className="profile-image" />
        </div>
        <h1 className="user-name">Ashmeet Singh</h1>

        <div className="action-container">
          {screen === 'login' && (
            <button className="sign-in-button" onClick={onSignIn}>
              Sign In
            </button>
          )}

          {screen === 'loading' && (
            <div className="loader-container">
              <div className="windows-spinner" />
              <p className="loading-text">Welcome</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
