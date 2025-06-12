import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../App.module.scss';

function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Додаємо нові поля до стану
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: 'student',
    secretKey: '',
    name: '',
    surname: '',
    group: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.username || !formData.password || !formData.email) {
        throw new Error("Будь ласка, заповніть всі обов'язкові поля");
      }
      if (formData.role === 'student' && (!formData.name || !formData.surname || !formData.group)) {
        throw new Error("Для студента потрібно вказати ім'я, прізвище та групу");
      }

      // Передаємо весь об'єкт formData в функцію реєстрації
      await register(formData);

      navigate('/students');

    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Сталася помилка під час реєстрації';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authForm}>
      <h2>Реєстрація</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Основні поля */}
        <div className={styles.formGroup}>
            <label>Логін:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
            <label>Пароль:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
            <label>Роль:</label>
            <select name="role" value={formData.role} onChange={handleChange} required>
                <option value="student">Студент</option>
                <option value="teacher">Викладач</option>
                <option value="admin">Адміністратор</option>
            </select>
        </div>
        
        {/* Додаткові поля, які з'являються для студента */}
        {formData.role === 'student' && (
          <>
            <div className={styles.formGroup}>
              <label>Ім'я:</label>
              <input type="text" name="name" placeholder="Ваше ім'я" value={formData.name} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Прізвище:</label>
              <input type="text" name="surname" placeholder="Ваше прізвище" value={formData.surname} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Група:</label>
              <input type="text" name="group" placeholder="Наприклад, 1ПІ-24б" value={formData.group} onChange={handleChange} required />
            </div>
          </>
        )}
        
        {/* Додаткове поле для вчителя/адміна */}
        {(formData.role === 'teacher' || formData.role === 'admin') && (
          <div className={styles.formGroup}>
            <label>Секретний ключ:</label>
            <input type="password" name="secretKey" placeholder="Введіть ключ доступу" value={formData.secretKey} onChange={handleChange} required />
          </div>
        )}

        <button type="submit" className={styles.authButton} disabled={loading}>
          {loading ? 'Завантаження...' : 'Зареєструватися'}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;