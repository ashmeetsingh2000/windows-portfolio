import React from 'react';
import './DesktopScreen.css';

const DesktopScreen = () => {
  const bgPath = `${import.meta.env.BASE_URL}bgimage.webp`;

  return (
    <div
      className="desktop-container"
      style={{ backgroundImage: `url(${bgPath})` }}
    >
      <div className="background-overlay-light"></div>
      <div className="desktop-screen">
        <h1 className="desktop-hello">Hello</h1>
      </div>
    </div>
  );
};

export default DesktopScreen;
