import React from 'react';
import styles from './WindowLoader.module.css';

const WindowLoader = ({ text = 'Loading...' }) => {
  return (
    <div className={styles.loaderContainer} role="status" aria-live="polite" aria-label="Loading content">
      <div className={styles.spinner} />
      <span className={styles.loadingText}>{text}</span>
    </div>
  );
};

export default WindowLoader;
