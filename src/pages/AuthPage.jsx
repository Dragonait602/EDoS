import { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import styles from '../App.module.scss';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <button
          className={styles.authToggle}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Немає акаунту? Зареєструватися' : 'Вже є акаунт? Увійти'}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;