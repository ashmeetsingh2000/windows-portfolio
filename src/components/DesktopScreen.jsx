import './DesktopScreen.css';

const DesktopScreen = () => {
  const bgPath = `${import.meta.env.BASE_URL}bgimage.jpg`;

  return (
    <div
      className="desktop-container"
      style={{ backgroundImage: `url(${bgPath})` }}
    >
      <div className="desktop-overlay" />
      <div className="desktop-content">
        <h1 className="desktop-hello">Hello</h1>
      </div>
    </div>
  );
};

export default DesktopScreen;
