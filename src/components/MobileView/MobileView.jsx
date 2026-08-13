import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './MobileView.module.css';
import LockScreen from '../LockScreen/LockScreen';
import LoginScreen from '../LoginScreen/LoginScreen';
import MobileAppContainer from './MobileAppContainer';
import { appRegistry } from '../../config/apps';
import { WALLPAPERS } from '../../config/wallpapers';

const MobileView = ({ screen = 'desktop', onUnlock, onSignIn, onLock }) => {
  const [bgIndex, setBgIndex] = useState(() => Math.floor(Math.random() * WALLPAPERS.length));
  const [isFading, setIsFading] = useState(false);
  const [activeAppId, setActiveAppId] = useState(null);
  const [time, setTime] = useState(new Date());
  const intervalRef = useRef(null);

  const bgPath = `${import.meta.env.BASE_URL}${WALLPAPERS[bgIndex]}`;
  const profilePath = `${import.meta.env.BASE_URL}profile2.jpg`;

  // Update clock time
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Cycle wallpaper background
  const changeWallpaper = useCallback(() => {
    setIsFading(true);
    setTimeout(() => {
      setBgIndex((prev) => {
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * WALLPAPERS.length);
        } while (nextIndex === prev && WALLPAPERS.length > 1);
        return nextIndex;
      });
      setIsFading(false);
    }, 400);
  }, []);

  const startWallpaperInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      changeWallpaper();
    }, 12000);
  }, [changeWallpaper]);

  useEffect(() => {
    startWallpaperInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startWallpaperInterval]);

  const timeString = time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

  const handleAppClick = (app) => {
    if (app.type === 'window') {
      setActiveAppId(app.id);
    } else if (app.type === 'link' && app.action) {
      app.action();
    }
  };

  const activeApp = appRegistry.find((a) => a.id === activeAppId);

  // Handle boot screen layers if mobile starts in lock or login state
  if (screen === 'lock') {
    return <LockScreen onUnlock={onUnlock} isActive={true} />;
  }

  if (screen === 'login' || screen === 'loading') {
    return <LoginScreen screen={screen} onSignIn={onSignIn} />;
  }

  const appSubtitles = {
    about: 'Bio & Technical Stack',
    experience: '5+ Years Experience',
    projects: 'Featured Applications',
    skills: 'Task Manager Skills',
    certifications: 'Verified Badges & Diplomas',
    linkedin: 'Professional Network',
    gmail: 'Contact Directly',
  };

  return (
    <div className={styles.mobileContainer}>
      {/* Background with glass overlay */}
      <div
        className={`${styles.mobileBackground} ${isFading ? styles.fadeOut : ''}`}
        style={{ backgroundImage: `url(${bgPath})` }}
      />
      <div className={styles.mobileOverlay} />

      {/* Main Dashboard Content */}
      <main className={styles.dashboardContent}>
        {/* Status Header */}
        <header className={styles.headerBar}>
          <span className={styles.headerClock}>{timeString}</span>
          <div className={styles.headerActions}>
            <button
              className={styles.iconBtn}
              onClick={changeWallpaper}
              title="Next Wallpaper"
              aria-label="Change Wallpaper"
            >
              🖼️
            </button>
            {onLock && (
              <button
                className={styles.iconBtn}
                onClick={onLock}
                title="Lock Screen"
                aria-label="Lock Screen"
              >
                🔒
              </button>
            )}
          </div>
        </header>

        {/* Hero Profile Banner */}
        <section className={styles.heroCard}>
          <div className={styles.avatarWrapper}>
            <img src={profilePath} alt="Ashmeet Singh" className={styles.profileAvatar} />
            <div className={styles.statusIndicator} title="Available for Opportunities" />
          </div>

          <div className={styles.heroInfo}>
            <h1 className={styles.userName}>Ashmeet Singh</h1>
            <p className={styles.userTitle}>Full-Stack Software Developer</p>
            <p className={styles.userBio}>
              5+ years building full-stack web applications, REST APIs & interactive frontend experiences.
            </p>
          </div>

          <div className={styles.heroActions}>
            <button
              className={`${styles.heroBtn} ${styles.primaryHeroBtn}`}
              onClick={() => setActiveAppId('about')}
            >
              <span>👤</span>
              <span>About Me</span>
            </button>
            <button
              className={styles.heroBtn}
              onClick={() => setActiveAppId('experience')}
            >
              <span>💼</span>
              <span>Experience</span>
            </button>
            <button
              className={styles.heroBtn}
              onClick={() => window.open('https://www.linkedin.com/in/ashmeet-singh-907460163/', '_blank')}
            >
              <span>🔗</span>
              <span>LinkedIn</span>
            </button>
          </div>
        </section>

        {/* App Launcher Grid */}
        <section>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Portfolio Apps</h2>
          </div>

          <div className={styles.appGrid}>
            {appRegistry.map((app) => (
              <div
                key={`mobile-app-${app.id}`}
                className={styles.appCard}
                onClick={() => handleAppClick(app)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAppClick(app);
                  }
                }}
                aria-label={`Open ${app.title}`}
              >
                {app.type === 'link' && <span className={styles.linkArrow}>↗</span>}
                <div className={styles.appCardIcon}>
                  {app.iconPath ? (
                    <img
                      src={`${import.meta.env.BASE_URL}${app.iconPath}`}
                      alt=""
                      className={styles.appCardIconImg}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div style={{ display: app.iconPath ? 'none' : 'flex' }}>
                    {app.icon || '🗔'}
                  </div>
                </div>

                <div className={styles.appCardContent}>
                  <span className={styles.appCardTitle}>{app.title}</span>
                  <span className={styles.appCardSub}>{appSubtitles[app.id] || 'Portfolio Section'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Bottom Navigation Dock */}
      <nav className={styles.bottomDock} aria-label="Mobile Navigation Dock">
        <button
          className={`${styles.dockItem} ${!activeAppId ? styles.dockItemActive : ''}`}
          onClick={() => setActiveAppId(null)}
          aria-label="Mobile Home Dashboard"
        >
          <span className={styles.dockIcon}>🏠</span>
          <span>Home</span>
        </button>

        <button
          className={`${styles.dockItem} ${activeAppId === 'about' ? styles.dockItemActive : ''}`}
          onClick={() => setActiveAppId('about')}
          aria-label="About"
        >
          <span className={styles.dockIcon}>👤</span>
          <span>About</span>
        </button>

        <button
          className={`${styles.dockItem} ${activeAppId === 'experience' ? styles.dockItemActive : ''}`}
          onClick={() => setActiveAppId('experience')}
          aria-label="Work Experience"
        >
          <span className={styles.dockIcon}>💼</span>
          <span>Experience</span>
        </button>

        <button
          className={`${styles.dockItem} ${activeAppId === 'projects' ? styles.dockItemActive : ''}`}
          onClick={() => setActiveAppId('projects')}
          aria-label="Projects"
        >
          <span className={styles.dockIcon}>🚀</span>
          <span>Projects</span>
        </button>

        <button
          className={`${styles.dockItem} ${activeAppId === 'skills' ? styles.dockItemActive : ''}`}
          onClick={() => setActiveAppId('skills')}
          aria-label="Skills"
        >
          <span className={styles.dockIcon}>🛠️</span>
          <span>Skills</span>
        </button>
      </nav>

      {/* Full-Screen Mobile App Modal */}
      {activeApp && (
        <MobileAppContainer
          app={activeApp}
          onClose={() => setActiveAppId(null)}
        />
      )}
    </div>
  );
};

export default MobileView;
