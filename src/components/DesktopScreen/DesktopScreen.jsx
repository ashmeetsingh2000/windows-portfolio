import styles from './DesktopScreen.module.css';

const DesktopScreen = () => {
  const bgPath = `${import.meta.env.BASE_URL}bgimage.jpg`;

  return (
    <div
      className={styles['desktop-container']}
      style={{ backgroundImage: `url(${bgPath})` }}
    >
      <div className={styles['desktop-overlay']} />
      <div className={styles['desktop-content']}>
        <h1 className={styles['desktop-hello']}>Hello</h1>
      </div>
    </div>
  );
};

export default DesktopScreen;
