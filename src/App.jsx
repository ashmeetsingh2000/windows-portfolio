import React, { useState, useCallback, useRef, useEffect } from 'react';
import LockScreen from './components/LockScreen/LockScreen';
import LoginScreen from './components/LoginScreen/LoginScreen';
import DesktopScreen from './components/DesktopScreen/DesktopScreen';
import MobileView from './components/MobileView/MobileView';
import './App.css';

function App() {
  const [screen, setScreen] = useState('lock'); // 'lock' | 'login' | 'loading' | 'desktop'
  const [isMobile, setIsMobile] = useState(window.innerWidth < 400);
  const transitionRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 400);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleUnlock = useCallback(() => {
    setScreen((prev) => (prev === 'lock' ? 'login' : prev));
  }, []);

  const handleSignIn = useCallback(() => {
    setScreen((prev) => {
      if (prev !== 'login') return prev; // guard: only transition from login
      // Clear any existing timeout to prevent race conditions
      if (transitionRef.current) clearTimeout(transitionRef.current);
      transitionRef.current = setTimeout(() => {
        setScreen('desktop');
        transitionRef.current = null;
      }, 2000);
      return 'loading';
    });
  }, []);

  if (isMobile) {
    return <MobileView />;
  }

  const isLockVisible = screen === 'lock';
  const isLoginVisible = screen === 'login' || screen === 'loading';
  const isDesktopVisible = screen === 'desktop';

  return (
    <div className="app-container">
      <div className={`screen-layer ${isLockVisible ? 'layer-visible' : 'layer-hidden'}`}>
        <LockScreen onUnlock={handleUnlock} isActive={isLockVisible} />
      </div>

      <div className={`screen-layer ${isLoginVisible ? 'layer-visible' : 'layer-hidden'}`}>
        <LoginScreen screen={screen} onSignIn={handleSignIn} />
      </div>

      <div className={`screen-layer ${isDesktopVisible ? 'layer-visible' : 'layer-hidden'}`}>
        <DesktopScreen />
      </div>
    </div>
  );
}

export default App;
