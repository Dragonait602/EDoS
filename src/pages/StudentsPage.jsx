import { useState, useMemo } from 'react';
import { useStudents } from '../hooks/useStudents';
import { useAuth } from '../contexts/AuthContext';
import StudentCard from '../components/StudentCard';
import ModalEditStudent from '../components/ModalEditStudent';
import ModalGrades from '../components/ModalGrades';
import styles from '../App.module.scss';

function StudentsPage() {
    const { user } = useAuth();
    const { students, loading, error, addStudent, updateStudent, deleteStudent, resetPassword, addOrUpdateGrade } = useStudents();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [isGradesModalOpen, setIsGradesModalOpen] = useState(false);
    const [studentForGrades, setStudentForGrades] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState('all');

    // Права доступу для різних дій
    const canEdit = user && ['teacher', 'admin'].includes(user.role);
    const canDelete = user && user.role === 'admin';
    const canResetPassword = user && user.role === 'admin';

    const handleOpenAddModal = () => {
        setEditingStudent(null);
        setIsEditModalOpen(true);
    };

    const handleOpenEditModal = (student) => {
        setEditingStudent(student);
        setIsEditModalOpen(true);
    };

    const handleDelete = (studentId) => {
        if (window.confirm('Ви впевнені, що хочете видалити цього студента?')) {
            deleteStudent(studentId);
        }
    };

    const handleSave = async (studentData) => {
        if (editingStudent) {
            await updateStudent(editingStudent._id, studentData);
        } else {
            const result = await addStudent(studentData);
            if (result.success && result.data.credentials) {
                const { username, password } = result.data.credentials;
                alert(
                    `Студента та акаунт створено!\n\n` +
                    `Логін: ${username}\n` +
                    `Пароль: ${password}\n\n` +
                    `Будь ласка, скопіюйте ці дані. Вони не будуть показані знову.`
                );
            }
        }
        setIsEditModalOpen(false);
    };
    
    const handleResetPassword = async (userId) => {
        if (!userId) {
            alert('У цього студента немає акаунту для скидання пароля.');
            return;
        }
        if (window.confirm('Ви впевнені, що хочете скинути пароль для цього користувача? Старий пароль буде втрачено.')) {
            const result = await resetPassword(userId);
            if (result.success) {
                alert(`Новий пароль: ${result.data.newPassword}\n\nБудь ласка, скопіюйте його.`);
            } else {
                alert(`Помилка: ${result.error || 'Не вдалося скинути пароль'}`);
            }
        }
    };

    const handleOpenGradesModal = (student) => {
        setStudentForGrades(student);
        setIsGradesModalOpen(true);
    };

    const handleCloseGradesModal = () => {
        setIsGradesModalOpen(false);
        setStudentForGrades(null);
    };

    const handleSaveGrade = async (gradeData) => {
        if (!studentForGrades) return;
        const result = await addOrUpdateGrade(studentForGrades._id, gradeData);
        
        if (result.success) {
            setStudentForGrades(result.data);
        } else {
            alert(`Помилка: ${result.error}`);
        }
    };

    const groups = useMemo(() => ['all', ...new Set(students.map(s => s.group))], [students]);
    
    const filteredStudents = useMemo(() => {
        if (selectedGroup === 'all') {
            return students;
        }
        return students.filter(student => student.group === selectedGroup);
    }, [students, selectedGroup]);

    if (loading) return <div className={styles.container}><p>Завантаження студентів...</p></div>;
    if (error) return <div className={styles.container}><p className={styles.error}>{error}</p></div>;

    return (
        <div className={styles.container}>
            <h2 className={styles.groups__title}>Студенти</h2>
            {user && user.role === 'admin' && (
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <button onClick={handleOpenAddModal} className={styles.detailsButton}>Додати студента</button>
                </div>
            )}
            
            <div className={styles.groups} style={{ flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
                {groups.map(group => (
                    <button
                        key={group}
                        onClick={() => setSelectedGroup(group)}
                        className={styles.groups__button}
                        style={{ backgroundColor: selectedGroup === group ? '#1e4fb7' : '#2563eb' }}
                    >
                        {group === 'all' ? 'Всі групи' : group}
                    </button>
                ))}
            </div>

            <div style={{ padding: '20px' }}>
                {filteredStudents.length > 0 ? (
                    filteredStudents.map(student => {
                        // !!! ВИПРАВЛЕНО: Додаємо перевірку, чи є картка "власною" для студента !!!
                        const isOwnCard = user && user.role === 'student' && user.studentId === student._id;
                        return (
                            <StudentCard
                                key={student._id}
                                student={student}
                                onEdit={canEdit ? handleOpenEditModal : null}
                                onDelete={canDelete ? handleDelete : null}
                                onResetPassword={canResetPassword ? handleResetPassword : null}
                                // Кнопка "Оцінки" видима для вчителів/адмінів АБО для студента на його картці
                                onOpenGrades={canEdit || isOwnCard ? handleOpenGradesModal : null}
                            />
                        );
                    })
                ) : (
                    <p style={{ textAlign: 'center', marginTop: '30px' }}>Студентів у цій групі не знайдено.</p>
                )}
            </div>

            {isEditModalOpen && (
                <ModalEditStudent
                    student={editingStudent}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleSave}
                />
            )}

            {isGradesModalOpen && (
                <ModalGrades
                    student={studentForGrades}
                    onClose={handleCloseGradesModal}
                    onSaveGrade={handleSaveGrade}
                    // !!! ВИПРАВЛЕНО: Передаємо право на редагування в модальне вікно !!!
                    canEditGrades={canEdit}
                />
            )}
        </div>
    );
}

export default StudentsPage;