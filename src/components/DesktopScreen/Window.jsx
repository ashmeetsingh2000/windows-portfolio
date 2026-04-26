import React from 'react';
import styles from './Window.module.css';

const Window = ({ window, onClose, onFocus }) => {
  return (
    <div 
      className={`${styles.window} ${window.isActive ? styles.active : ''}`}
      style={{ zIndex: window.zIndex }}
      onClick={() => onFocus(window.id)}
    >
      <div className={styles.titleBar}>
        <span className={styles.title}>{window.title}</span>
        <button 
          className={styles.closeBtn} 
          onClick={(e) => {
            e.stopPropagation(); // prevent window from focusing when closing
            onClose(window.id);
          }}
        >
          X
        </button>
      </div>
      <div className={styles.content}>
        {/* Content goes here eventually */}
        <p>Content for {window.title}</p>
      </div>
    </div>
  );
};

export default Window;
