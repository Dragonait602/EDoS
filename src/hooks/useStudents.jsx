import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/students';
const USERS_API_URL = 'http://localhost:5000/api/users';

export function useStudents() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStudents = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(API_URL);
            setStudents(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Помилка завантаження студентів');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    const addStudent = async (studentData) => {
        try {
            const response = await axios.post(API_URL, studentData);
            // Оновлюємо стан локально, без повного перезавантаження списку
            setStudents(prevStudents => [...prevStudents, response.data.student]);
            return { success: true, data: response.data };
        } catch (err) {
            console.error('Помилка при додаванні студента:', err);
            return { success: false, error: err.response?.data?.message || 'Не вдалося додати студента' };
        }
    };

    const updateStudent = async (studentId, studentData) => {
        try {
            const response = await axios.put(`${API_URL}/${studentId}`, studentData);
            const updatedStudent = response.data.student;
            // Оновлюємо стан локально
            setStudents(prevStudents => prevStudents.map(s => (s._id === studentId ? updatedStudent : s)));
            return { success: true };
        } catch (err) {
            console.error('Помилка при оновленні студента:', err);
            return { success: false, error: err.response?.data?.message || 'Не вдалося оновити дані' };
        }
    };

    const deleteStudent = async (studentId) => {
        try {
            await axios.delete(`${API_URL}/${studentId}`);
            // Оновлюємо стан локально
            setStudents(prevStudents => prevStudents.filter(s => s._id !== studentId));
            return { success: true };
        } catch (err) {
            console.error('Помилка при видаленні студента:', err);
            return { success: false, error: err.response?.data?.message || 'Не вдалося видалити студента' };
        }
    };
    
    const resetPassword = async (userId) => {
        try {
            const response = await axios.post(`${USERS_API_URL}/${userId}/reset-password`);
            return { success: true, data: response.data };
        } catch (err) {
            console.error('Помилка при скиданні пароля:', err);
            return { success: false, error: err.response?.data?.message || 'Не вдалося скинути пароль' };
        }
    };

    // !!! ВИПРАВЛЕНО: Тепер функція повертає оновлені дані студента !!!
    const addOrUpdateGrade = async (studentId, gradeData) => {
        try {
            const response = await axios.post(`${API_URL}/${studentId}/grades`, gradeData);
            const updatedStudent = response.data;
            
            // Оновлюємо дані студента в загальному списку
            setStudents(prevStudents =>
                prevStudents.map(s => (s._id === studentId ? updatedStudent : s))
            );
            
            // Повертаємо оновленого студента, щоб модальне вікно могло оновитися
            return { success: true, data: updatedStudent };
        } catch (err) {
            console.error('Помилка при збереженні оцінки:', err);
            return { success: false, error: err.response?.data?.message || 'Не вдалося зберегти оцінку' };
        }
    };

    return {
        students,
        loading,
        error,
        addStudent,
        updateStudent,
        deleteStudent,
        resetPassword,
        addOrUpdateGrade,
        refetch: fetchStudents
    };
}