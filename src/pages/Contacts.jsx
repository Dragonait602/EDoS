import React from 'react';
import styles from '../App.module.scss'; // Використовуємо наш головний файл стилів

function ContactsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.contactsPage}> {/* Новий клас для стилізації сторінки */}
        
        <div className={styles.contactsSection}>
          <h1 className={styles.heading} style={{ textAlign: 'center', marginBottom: '2rem' }}>Про проєкт "EDos"</h1>
          <p>
            "EDos" — це сучасна електронна база даних, створена для спрощення управління інформацією про студентів в освітніх закладах. Наша мета — надати зручний, швидкий та безпечний інструмент для викладачів, адміністраторів та самих студентів для доступу до академічної інформації.
          </p>
        </div>

        <div className={styles.contactsSection}>
          <h2>Зв'яжіться з нами</h2>
          <ul className={styles.contactList}>
            <li><strong>Email:</strong> <a href="mailto:info@edos-app.com">info@edos-app.com</a></li>
            <li><strong>Телефон:</strong> +380 (44) 123-45-67</li>
            <li><strong>Адреса:</strong> м. Вінниця, вул. Келецька, 98, Україна</li>
          </ul>
        </div>

        <div className={styles.contactsSection}>
            <h2>Наша команда</h2>
            <div className={styles.teamGrid}>
                <div className={styles.teamMember}>
                    <h4>Вадим Костюк</h4>
                    <p>Full-Stack Developer</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

// Переконайтеся, що експорт відповідає назві компонента
export default ContactsPage;