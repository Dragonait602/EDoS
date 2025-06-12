// src/pages/StudentsPage.jsx
import { useState } from 'react';
import styles from '../App.module.scss';
import { useAuth } from '../contexts/AuthContext';

function StudentsPage() {
  const { user } = useAuth();
  
  // Різний функціонал для різних ролей
  const canEdit = ['teacher', 'admin'].includes(user?.role);
  const canDelete = user?.role === 'admin';

  return (
    <div className={styles.container}>
      <h2 className={styles.groups__title}>Групи</h2>
      <div className={styles.groups}>
        <div className="">
          <h3>Перший курс</h3>
          <button className={styles.groups__button}>1ПІ-24б</button>
        </div>
        {/* ... інші групи ... */}
      </div>
      
      {canEdit && (
        <div className={styles.studentActions}>
          <button>Додати студента</button>
        </div>
      )}
      
      {canDelete && (
        <div className={styles.adminActions}>
          <button>Видалити групу</button>
        </div>
      )}
    </div>
  );
}

export default StudentsPage;