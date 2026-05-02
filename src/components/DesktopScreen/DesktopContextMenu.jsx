import React, { useEffect, useRef, useState } from 'react';
import styles from './DesktopContextMenu.module.css';

const DesktopContextMenu = ({ position, onClose, onRefresh, onCloseAll, onNextWallpaper }) => {
  const menuRef = useRef(null);
  const [adjustedPosition, setAdjustedPosition] = useState(position);

  // Handle outside click and escape key
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Adjust position on mount to prevent overflow
  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      let newX = position.x;
      let newY = position.y;

      if (position.x + rect.width > window.innerWidth) {
        newX = window.innerWidth - rect.width - 5;
      }
      if (position.y + rect.height > window.innerHeight) {
        newY = window.innerHeight - rect.height - 5;
      }

      setAdjustedPosition({ x: newX, y: newY });
    }
  }, [position]);

  const menuStyle = {
    top: adjustedPosition.y,
    left: adjustedPosition.x,
  };

  return (
    <div ref={menuRef} className={styles.contextMenu} style={menuStyle} onContextMenu={(e) => e.preventDefault()}>
      <div className={styles.menuItem} onClick={() => { onRefresh(); onClose(); }}>
        <span className={styles.menuIcon}>🔄</span>
        <span>Refresh</span>
      </div>
      <div className={styles.menuDivider}></div>
      <div className={styles.menuItem} onClick={() => { onCloseAll(); onClose(); }}>
        <span className={styles.menuIcon}>❌</span>
        <span>Close All Windows</span>
      </div>
      <div className={styles.menuDivider}></div>
      <div className={styles.menuItem} onClick={() => { onNextWallpaper(); onClose(); }}>
        <span className={styles.menuIcon}>🖼️</span>
        <span>Next Wallpaper</span>
      </div>
    </div>
  );
};

export default DesktopContextMenu;
