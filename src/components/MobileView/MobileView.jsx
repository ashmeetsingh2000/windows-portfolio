import styles from './MobileView.module.css';

const MobileView = () => {
  const bgPath = `${import.meta.env.BASE_URL}bgimage2.jpg`;

  return (
    <div
      className={styles['mobile-container']}
      style={{ backgroundImage: `url(${bgPath})` }}
    >
      <div className={styles['mobile-overlay']} />
      <div className={styles['mobile-content']}>
        <h2 className={styles['mobile-text']}>This portfolio is designed for a larger screen. Please visit on a laptop or desktop for the best experience.</h2>
      </div>
    </div>
  );
};

export default MobileView;
