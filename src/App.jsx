import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import StudentsPage from './pages/StudentsPage';
import ContactsPage from './pages/Contacts'; // ВИПРАВЛЕНО
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          {/* Публічні роути */}
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/contacts" element={<ContactsPage />} />

          {/* Захищені роути */}
          <Route 
            path="/students" 
            element={
              <ProtectedRoute roles={['admin', 'teacher', 'student']}>
                <StudentsPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
    </>
  );
}

export default App;