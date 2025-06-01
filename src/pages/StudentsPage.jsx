import { useState } from 'react';
import styles from '../App.module.scss';
import StudentCard from '../components/StudentCard';
import { useStudents } from '../hooks/useStudents.jsx';
import ModalEditStudent from '../components/ModalEditStudent';

function StudentsPage() {

const {students, addStudent, deleteStudent, updateStudent } = useStudents();
const [newName, setNewName] = useState('');
const [newGroup, setNewGroup] = useState('');
const [showModal, setShowModal] = useState(false);
const [modalStudent, setModalStudent] = useState(null);

const handleAdd = () => {
    if (!newName.trim() || !newGroup.trim()) {
        alert('Заповніть всі поля');
        return;
    }
    addStudent(newName, newGroup);
    setNewName('');
    setNewGroup('');
};

const handleEdit = (student) => {
    setModalStudent(student);
    setShowModal(true);
};


return (
<div>
    <div>
        <h1 className=''>Електронна база студентів</h1>
        <h2>Додати нового студента</h2>
        {/* Інтерфейс додавання студентів */}
        <input className={styles.addInput} placeholder="Ім’я" value={newName} onChange={(e) => setNewName(e.target.value)} />
        <input className={styles.addInput} placeholder="Група" value={newGroup} onChange={(e) => setNewGroup(e.target.value)} />
        <button onClick={handleAdd} style={{margin: '20px 0'}}>Додати</button>

      {/* Список студентів */}
        {students.map((student) => (
        <StudentCard
            key={student.id}
            {...student}
            onDelete={deleteStudent}
            onEdit={handleEdit}
        />
        ))}

      {/* Модальне вікно */}
        {showModal && (
        <ModalEditStudent
            student={modalStudent}
            onClose={() => setShowModal(false)}
            onSave={updateStudent}
        />
        )}
        </div>
</div>
)
}

export default StudentsPage