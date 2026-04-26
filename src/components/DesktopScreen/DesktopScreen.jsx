import React, { useState } from 'react';
import styles from './DesktopScreen.module.css';
import Window from './Window';
import Taskbar from './Taskbar';
import DesktopIcons from './DesktopIcons';
import { appRegistry } from '../../config/apps';

const DesktopScreen = ({ onLock }) => {
  const bgPath = `${import.meta.env.BASE_URL}bgimage.jpg`;

  const [windows, setWindows] = useState([]);
  const [highestZIndex, setHighestZIndex] = useState(10);

  const openWindow = (id, title) => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === id);
      const nextZ = highestZIndex + 1;

      if (existing) {
        setHighestZIndex(nextZ);
        return prev.map(w =>
          w.id === id
            ? { ...w, isOpen: true, isActive: true, isClosed: false, zIndex: nextZ }
            : { ...w, isActive: false }
        );
      } else {
        setHighestZIndex(nextZ);
        const newWin = { id, title, isOpen: true, isActive: true, isClosed: false, zIndex: nextZ };
        return [...prev.map(w => ({ ...w, isActive: false })), newWin];
      }
    });
  };

  const closeWindow = (id) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isOpen: false, isActive: false, isClosed: true } : w
    ));
  };

  const setActiveWindow = (id) => {
    setWindows(prev => {
      const target = prev.find(w => w.id === id);
      if (!target || target.isActive) return prev;

      const nextZ = highestZIndex + 1;
      setHighestZIndex(nextZ);
      return prev.map(w =>
        w.id === id
          ? { ...w, isActive: true, zIndex: nextZ }
          : { ...w, isActive: false }
      );
    });
  };

  const handleAppClick = (app) => {
    if (app.type === 'window') {
      openWindow(app.id, app.title);
    } else if (app.type === 'link' && app.action) {
      app.action();
    }
  };

  const handleTaskbarClick = (id) => {
    setWindows(prev => {
      const target = prev.find(w => w.id === id);
      if (target.isActive && target.isOpen) {
        // Window is active and open -> minimize it
        return prev.map(w =>
          w.id === id ? { ...w, isOpen: false, isActive: false } : w
        );
      } else {
        // Window is inactive or minimized -> bring to front and active
        const nextZ = highestZIndex + 1;
        setHighestZIndex(nextZ);
        return prev.map(w =>
          w.id === id ? { ...w, isOpen: true, isActive: true, zIndex: nextZ } : { ...w, isActive: false }
        );
      }
    });
  };

  return (
    <div
      className={styles['desktop-container']}
      style={{ backgroundImage: `url(${bgPath})` }}
    >
      <div className={styles['desktop-overlay']} />

      <DesktopIcons apps={appRegistry} onAppOpen={handleAppClick} />

      {/* Render windows (hidden if not open to retain state) */}
      {windows.map(win => (
        <div key={win.id} style={{ display: win.isOpen ? 'block' : 'none' }}>
          <Window
            window={win}
            onClose={closeWindow}
            onFocus={setActiveWindow}
          />
        </div>
      ))}

      {/* Taskbar Component */}
      <Taskbar windows={windows} onTaskbarClick={handleTaskbarClick} onLock={onLock} onAppClick={handleAppClick} />
    </div>
  );
};

export default DesktopScreen;
