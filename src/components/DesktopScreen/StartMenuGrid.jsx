import React from 'react';
import styles from './StartMenuGrid.module.css';

const StartMenuGrid = ({ apps, onAppClick, closeMenu }) => {
  return (
    <div className={styles.gridContainer}>
      {apps.map(app => (
        <div 
          key={`start-${app.id}`}
          className={styles.gridItem}
          onClick={() => {
            onAppClick(app);
            closeMenu();
          }}
        >
          <div className={styles.itemIcon}>
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
          <div className={styles.itemLabel}>{app.title}</div>
        </div>
      ))}
    </div>
  );
};

export default StartMenuGrid;
