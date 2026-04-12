import React, { useState } from 'react';
import LockScreen from './components/LockScreen';
import WelcomeScreen from './components/WelcomeScreen';
import DesktopScreen from './components/DesktopScreen';
import './App.css';

function App() {
  const [appState, setAppState] = useState('lock'); // 'lock', 'login', 'loading', 'desktop'

  const handleUnlock = () => {
    if (appState === 'lock') {
      setAppState('login');
    }
  };

  const handleSignIn = () => {
    setAppState('loading');
    setTimeout(() => {
      setAppState('desktop');
    }, 2000);
  };

  return (
    <div className="app-container">
      {/* Lock Screen Layer */}
      <div 
        className={`screen-layer ${appState === 'lock' ? 'layer-visible' : 'layer-hidden'}`}
      >
        <LockScreen onUnlock={handleUnlock} />
      </div>

      {/* Login Screen Layer */}
      <div 
        className={`screen-layer ${(appState === 'login' || appState === 'loading') ? 'layer-visible' : 'layer-hidden'}`}
      >
        <WelcomeScreen appState={appState} onSignIn={handleSignIn} />
      </div>

      {/* Desktop Screen Layer */}
      <div 
        className={`screen-layer ${appState === 'desktop' ? 'layer-visible' : 'layer-hidden'}`}
      >
        <DesktopScreen />
      </div>
    </div>
  );
}

export default App;
