import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import styles from './Window.module.css';

const Window = ({ window, position, onDragStop, onClose, onFocus }) => {
  const nodeRef = useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      handle={'.' + styles.titleBar}
      bounds="parent"
      defaultPosition={position}
      onStart={() => onFocus(window.id)}
      onStop={(e, data) => onDragStop(window.id, data)}
    >
      <div
        ref={nodeRef}
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
    </Draggable>
  );
};

export default Window;
