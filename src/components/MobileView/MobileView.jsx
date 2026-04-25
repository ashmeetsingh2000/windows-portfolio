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
        <h1 className={styles['mobile-text']}>Under Development</h1>
      </div>
    </div>
  );
};

export default MobileView;
