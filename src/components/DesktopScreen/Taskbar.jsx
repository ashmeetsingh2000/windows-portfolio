import React, { useState, useEffect, useRef } from 'react';
import styles from './Taskbar.module.css';
import { appRegistry } from '../../config/apps';
import StartMenuGrid from './StartMenuGrid';

const Taskbar = ({ windows, onTaskbarClick, onLock, onAppClick }) => {
  const [time, setTime] = useState(new Date());
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const startMenuRef = useRef(null);
  const startBtnRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000); // update every minute
    return () => clearInterval(timer);
  }, []);

  // Handle outside click and Escape key to close Start Menu
  useEffect(() => {
    if (!isStartOpen) return;

    const handleOutsideClick = (e) => {
      if (
        startMenuRef.current && 
        !startMenuRef.current.contains(e.target) &&
        startBtnRef.current &&
        !startBtnRef.current.contains(e.target)
      ) {
        setIsStartOpen(false);
      }
    };

    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        setIsStartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isStartOpen]);

  // Force time update on mount to get exact current time
  useEffect(() => {
    setTime(new Date());
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${strMinutes} ${ampm}`;
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      {/* Start Menu Panel */}
      <div 
        ref={startMenuRef}
        className={`${styles.startMenu} ${isStartOpen ? styles.startMenuOpen : ''}`}
      >
        <div className={styles.startMenuContent}>
          <div className={styles.startMenuPlaceholder}>
            <h3>Start Menu</h3>
            <StartMenuGrid apps={appRegistry} onAppClick={onAppClick} closeMenu={() => setIsStartOpen(false)} />
          </div>
        </div>
        <div className={styles.startMenuBottom}>
          <div className={styles.userProfile}>
            <div className={styles.userAvatarContainer}>
              {!imgError ? (
                <img
                  src={`${import.meta.env.BASE_URL}profile2.jpg`}
                  alt="Profile"
                  className={styles.userAvatarImg}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className={styles.userAvatarFallback}>AS</div>
              )}
            </div>
            <span>Ashmeet Singh</span>
          </div>
          <button className={styles.powerBtn} onClick={onLock} title="Lock Desktop">
            <svg
              stroke="white"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="power-off"
              height="21px"
              width="21px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
              <line x1="12" y1="2" x2="12" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Taskbar */}
      <div className={styles.taskbar}>
        <div className={styles.leftSection}>
          <button
            ref={startBtnRef}
            className={`${styles.startBtn} ${isStartOpen ? styles.startBtnActive : ''}`}
            onClick={() => setIsStartOpen(!isStartOpen)}
          >
            {/* Simple Windows-like logo placeholder */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="7" height="7" fill="#0078D4" />
              <rect x="11" y="2" width="7" height="7" fill="#0078D4" />
              <rect x="2" y="11" width="7" height="7" fill="#0078D4" />
              <rect x="11" y="11" width="7" height="7" fill="#0078D4" />
            </svg>
          </button>
          
          <div className={styles.taskbarDivider}></div>
          
          {/* App Group Container (Pinned + Running) */}
          <div className={styles.appGroup}>
            {appRegistry.filter(app => app.type === 'link').map(app => (
              <div
                key={`pinned-${app.id}`}
                className={styles.taskbarItem}
                onClick={() => onAppClick(app)}
                title={app.title}
              >
                <div className={styles.taskbarItemIcon}>
                  {app.iconPath ? (
                    <img 
                      src={`${import.meta.env.BASE_URL}${app.iconPath}`} 
                      alt={app.title} 
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                    />
                  ) : null}
                  <div style={{ display: app.iconPath ? 'none' : 'flex' }}>
                    {app.icon}
                  </div>
                </div>
              </div>
            ))}

            {/* Running Windows Section */}
            {windows.filter(w => w.isOpen).map(win => {
              const appInfo = appRegistry.find(a => a.id === win.id);
              // Prevent duplication if app is pinned
              if (appInfo && appInfo.type === 'link') return null;

              return (
                <div
                  key={win.id}
                  className={`${styles.taskbarItem} ${win.isActive && !win.isMinimized ? styles.taskbarItemActive : ''}`}
                  onClick={() => onTaskbarClick(win.id)}
                  title={win.title}
                >
                  <div className={styles.taskbarItemIcon}>
                    {appInfo && appInfo.iconPath ? (
                      <img 
                        src={`${import.meta.env.BASE_URL}${appInfo.iconPath}`} 
                        alt={win.title} 
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                      />
                    ) : null}
                    <div style={{ display: (appInfo && appInfo.iconPath) ? 'none' : 'flex' }}>
                      {appInfo ? appInfo.icon : '🗔'}
                    </div>
                  </div>
                  {win.isOpen && win.isMinimized && (
                    <div className={styles.minimizedIndicator} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.systemInfo}>
            <span className={styles.time}>{formatTime(time)}</span>
            <span className={styles.date}>{formatDate(time)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Taskbar;
