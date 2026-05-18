import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import styles from './Window.module.css';
import { appRegistry } from '../../config/apps';

const Window = ({ window, position, onDragStop, onClose, onMinimize, onToggleFullscreen, onFocus }) => {
  const nodeRef = useRef(null);

  if (window.isMinimized) return null;

  const appConfig = appRegistry.find(app => app.id === window.id);
  const AppComponent = appConfig ? appConfig.component : null;

  return (
    <Draggable
      nodeRef={nodeRef}
      handle={'.' + styles.titleBar}
      bounds="parent"
      disabled={window.isFullscreen}
      defaultPosition={position}
      onStart={() => onFocus(window.id)}
      onStop={(e, data) => onDragStop(window.id, data)}
    >
      <div
        ref={nodeRef}
        className={`${styles.window} ${window.isActive ? styles.active : ''} ${window.isFullscreen ? styles.fullscreen : ''}`}
        style={{ zIndex: window.zIndex }}
        onClick={() => onFocus(window.id)}
      >
        <div className={styles.titleBar}>
          <span className={styles.title}>{window.title}</span>
          <div className={styles.windowControls}>
            <button
              className={styles.controlBtn}
              onClick={(e) => {
                e.stopPropagation();
                onMinimize(window.id);
              }}
              title="Minimize"
            >
              _
            </button>
            <button
              className={styles.controlBtn}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFullscreen(window.id);
              }}
              title="Maximize"
            >
              {window.isFullscreen ? '❐' : '□'}
            </button>
            <button
              className={`${styles.controlBtn} ${styles.closeBtn}`}
              onClick={(e) => {
                e.stopPropagation();
                onClose(window.id);
              }}
              title="Close"
            >
              X
            </button>
          </div>
        </div>
        <div className={styles.content}>
          {AppComponent ? <AppComponent /> : <p>Content for {window.title}</p>}
        </div>
      </div>
    </Draggable>
  );
};

export default Window;
