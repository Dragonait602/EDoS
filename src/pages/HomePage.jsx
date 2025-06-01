import styles from '../App.module.scss'

function HomePage() {
    console.log("HomePage is rendering");
return (
<>
    <div className={styles.container}>
        <div class="m-5 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <img src="/src/assets/mainImage.png" alt="Student" class="w-full max-w-md mx-auto" />
            <div class="text-center md:text-left space-y-4">
                <h1 class="text-4xl font-bold">Електронна база даних студентів</h1>
                <p class={styles.home__text}>Зберігайте, оновлюйте та переглядайте інформацію про студентів швидко та зручно. Інтуїтивний інтерфейс і надійна структура — все для вашої ефективної роботи.</p>
                <button class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Детальніше</button>
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
)
}

export default HomePage