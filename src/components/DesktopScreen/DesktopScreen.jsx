import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './DesktopScreen.module.css';
import Window from './Window';
import Taskbar from './Taskbar';
import DesktopIcons from './DesktopIcons';
import DesktopContextMenu from './DesktopContextMenu';
import { appRegistry } from '../../config/apps';
import { WALLPAPERS } from '../../config/wallpapers';

const DesktopScreen = ({ onLock }) => {
  const [bgIndex, setBgIndex] = useState(() => Math.floor(Math.random() * WALLPAPERS.length));
  const [isFading, setIsFading] = useState(false);
  const bgPath = `${import.meta.env.BASE_URL}${WALLPAPERS[bgIndex]}`;
  const intervalRef = useRef(null);

  const [windows, setWindows] = useState([]);
  const [highestZIndex, setHighestZIndex] = useState(10);
  const [windowPositions, setWindowPositions] = useState({});
  const [contextMenu, setContextMenu] = useState({ isOpen: false, x: 0, y: 0 });

  const openWindow = (id, title) => {
    setWindowPositions(prev => {
      if (!prev[id]) {
        // Cascade offset based on number of opened windows to prevent perfect overlap
        const offset = Object.keys(prev).length * 30;
        return { ...prev, [id]: { x: offset, y: offset } };
      }
      return prev;
    });

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

  const handleDragStop = (id, data) => {
    setWindowPositions(prev => ({
      ...prev,
      [id]: { x: data.x, y: data.y }
    }));
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({
      isOpen: true,
      x: e.pageX,
      y: e.pageY,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ ...contextMenu, isOpen: false });
  };

  const handleRefresh = () => {
    // Visual placebo
  };

  const handleCloseAll = () => {
    setWindows(prev => prev.map(w => ({ ...w, isOpen: false, isActive: false, isClosed: true })));
  };

  const changeWallpaper = useCallback(() => {
    setIsFading(true);
    setTimeout(() => {
      setBgIndex(prev => {
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * WALLPAPERS.length);
        } while (nextIndex === prev && WALLPAPERS.length > 1);
        return nextIndex;
      });
      setIsFading(false);
    }, 400); // 400ms fade duration
  }, []);

  const startWallpaperInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      changeWallpaper();
    }, 10000);
  }, [changeWallpaper]);

  useEffect(() => {
    startWallpaperInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startWallpaperInterval]);

  const handleNextWallpaper = useCallback(() => {
    changeWallpaper();
    startWallpaperInterval();
  }, [changeWallpaper, startWallpaperInterval]);

  return (
    <div
      className={styles['desktop-container']}
      onContextMenu={handleContextMenu}
    >
      <div
        className={`${styles['desktop-background']} ${isFading ? styles['fade-out'] : ''}`}
        style={{ backgroundImage: `url(${bgPath})` }}
      />
      <div className={styles['desktop-overlay']} />

      <DesktopIcons apps={appRegistry} onAppOpen={handleAppClick} />

      {/* Render windows (hidden if not open to retain state) */}
      {windows.map(win => (
        <Window
          key={win.id}
          window={win}
          position={windowPositions[win.id]}
          onDragStop={handleDragStop}
          onClose={closeWindow}
          onFocus={setActiveWindow}
        />
      ))}

      {/* Taskbar Component */}
      <Taskbar windows={windows} onTaskbarClick={handleTaskbarClick} onLock={onLock} onAppClick={handleAppClick} />

      {contextMenu.isOpen && (
        <DesktopContextMenu
          position={{ x: contextMenu.x, y: contextMenu.y }}
          onClose={handleCloseContextMenu}
          onRefresh={handleRefresh}
          onCloseAll={handleCloseAll}
          onNextWallpaper={handleNextWallpaper}
        />
      )}
    </div>
  );
};

export default DesktopScreen;
