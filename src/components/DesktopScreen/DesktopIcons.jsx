import React, { useState } from 'react';
import styles from './DesktopIcons.module.css';

const DesktopIcons = ({ apps, onAppOpen }) => {
  const [selectedId, setSelectedId] = useState(null);

  const handleClick = (e, id) => {
    e.stopPropagation();
    setSelectedId(id);
  };

  const handleDoubleClick = (app) => {
    onAppOpen(app);
    setSelectedId(null);
  };

  const handleKeyDown = (e, app) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onAppOpen(app);
      setSelectedId(null);
    }
  };

  const handleBackgroundClick = () => {
    setSelectedId(null);
  };

  return (
    <div className={styles.desktopIconsContainer} onClick={handleBackgroundClick}>
      {apps.map(app => (
        <div 
          key={`desktop-${app.id}`} 
          className={`${styles.iconWrapper} ${selectedId === app.id ? styles.selected : ''}`}
          onClick={(e) => handleClick(e, app.id)}
          onDoubleClick={() => handleDoubleClick(app)}
          onKeyDown={(e) => handleKeyDown(e, app)}
          role="button"
          tabIndex={0}
          aria-label={`Open ${app.title}`}
        >
           <div className={styles.iconImage}>
             {app.iconPath ? (
               <img 
                 src={`${import.meta.env.BASE_URL}${app.iconPath}`} 
                 alt={app.title} 
                 onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
               />
             ) : null}
             <div className={styles.iconFallback} style={{ display: app.iconPath ? 'none' : 'flex' }}>
               {app.icon}
             </div>
           </div>
           <div className={styles.iconLabel}>{app.title}</div>
        </div>
      ))}
    </div>
  );
};

export default DesktopIcons;
