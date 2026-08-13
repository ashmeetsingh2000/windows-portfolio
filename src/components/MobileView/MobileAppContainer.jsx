import React, { useEffect } from 'react';
import styles from './MobileAppContainer.module.css';

const MobileAppContainer = ({ app, onClose }) => {
  const AppComponent = app ? app.component : null;

  // Handle Escape key to close mobile app view
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!app) return null;

  return (
    <div className={styles.container} role="dialog" aria-label={`${app.title} Application View`}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onClose} aria-label="Go Back to Dashboard">
          <span>←</span>
          <span>Back</span>
        </button>

        <div className={styles.titleArea}>
          <div className={styles.appIcon}>
            {app.iconPath ? (
              <img
                src={`${import.meta.env.BASE_URL}${app.iconPath}`}
                alt=""
                className={styles.appIconImg}
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) e.target.nextSibling.style.display = 'inline';
                }}
              />
            ) : null}
            <span style={{ display: app.iconPath ? 'none' : 'inline' }}>{app.icon || '🗔'}</span>
          </div>
          <span className={styles.appTitle}>{app.title}</span>
        </div>

        <button className={styles.closeBtn} onClick={onClose} aria-label="Close View">
          ✕
        </button>
      </div>

      <div className={styles.contentBody}>
        {AppComponent ? <AppComponent /> : <p style={{ padding: '24px' }}>Content for {app.title}</p>}
      </div>
    </div>
  );
};

export default MobileAppContainer;
