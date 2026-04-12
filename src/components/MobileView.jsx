import './MobileView.css';

const MobileView = () => {
  const bgPath = `${import.meta.env.BASE_URL}bgimage2.jpg`;

  return (
    <div
      className="mobile-container"
      style={{ backgroundImage: `url(${bgPath})` }}
    >
      <div className="mobile-overlay" />
      <div className="mobile-content">
        <h1 className="mobile-text">Under Development</h1>
      </div>
    </div>
  );
};

export default MobileView;
