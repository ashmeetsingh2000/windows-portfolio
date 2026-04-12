import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import DesktopScreen from './components/DesktopScreen';
import './App.css';

function App() {
  const [appState, setAppState] = useState('initial'); // 'initial', 'loading', 'entered'

  const handleSignIn = () => {
    setAppState('loading');
    setTimeout(() => {
      setAppState('entered');
    }, 2000);
  };

  return (
    <div className="app-container">
      {/* Welcome Screen Layer */}
      <div 
        className={`screen-layer ${appState === 'entered' ? 'layer-hidden' : 'layer-visible'}`}
      >
        <WelcomeScreen appState={appState} onSignIn={handleSignIn} />
      </div>

      {/* Desktop Screen Layer */}
      <div 
        className={`screen-layer ${appState === 'entered' ? 'layer-visible' : 'layer-hidden'}`}
      >
        <DesktopScreen />
      </div>
    </div>
  );
}

export default App;
