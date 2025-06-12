import styles from '../App.module.scss';

function HomePage() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.mainContentGrid}>
          <img src="/src/assets/mainImage.png" alt="Student" className={styles.mainImage} />
          <div className={styles.textContainer}>
            <h1 className={styles.heading}>Електронна база даних студентів</h1>
            <p className={styles.home__text}>
              Зберігайте, оновлюйте та переглядайте інформацію про студентів швидко та зручно. Інтуїтивний інтерфейс і надійна структура — все для вашої ефективної роботи.
            </p>
            <button className={styles.detailsButton}>Детальніше</button>
          </div>
        </div>
        <div className={styles.home__row}>
          <div className={styles.home__rowF}>
            <h3>СПИСОК СТУДЕНТІВ</h3>
            <p>Переглядайте повну інформацію про всіх студентів, включно з оцінками, курсами та відвідуваністю.</p>
          </div>
          <div className={styles.home__rowL}>
            <h3>КУРСИ ТА ОЦІНКИ</h3>
            <p>Створюйте курси, призначайте викладачів і відстежуйте успішність студентів у режимі реального часу.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;