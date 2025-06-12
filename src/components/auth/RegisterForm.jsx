import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Виправлений шлях імпорту
import styles from '../../App.module.scss';

function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: 'student',
    studentId: ''
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
      // Валідація даних
      if (!formData.username || !formData.password || !formData.email) {
        throw new Error("Будь ласка, заповніть всі обов'язкові поля");
      }

      if (formData.role === 'student' && !formData.studentId) {
        throw new Error('Для студента потрібно вказати ID');
      }

      const success = await register(
        formData.username,
        formData.password,
        formData.email,
        formData.role,
        formData.studentId
      );

      if (success) {
        navigate('/dashboard'); // Редирект після успішної реєстрації
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Сталася помилка під час реєстрації');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <div className={styles.authForm}>
          <h2>Реєстрація</h2>
          {error && <p className={styles.error}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Логін:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Пароль:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Роль:</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="student">Студент</option>
                <option value="teacher">Викладач</option>
                <option value="admin">Адміністратор</option>
              </select>
            </div>

            {formData.role === 'student' && (
              <div className={styles.formGroup}>
                <label>ID студента:</label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  required={formData.role === 'student'}
                />
              </div>
            )}

            <button 
              type="submit" 
              className={styles.authButton}
              disabled={loading}
            >
              {loading ? 'Завантаження...' : 'Зареєструватися'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;