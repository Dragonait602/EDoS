import { useState, useEffect } from "react";

export function useStudents(){
    const [students, setStudents] = useState(() => {
        try {
            const stored = localStorage.getItem('students');
            return stored ? JSON.parse(stored) : [];
        } catch(e){
            console.error('Помилка при читанні студентів з localStorage', e);
            return [];
        }
    }
);

useEffect(() =>{
    localStorage.setItem('students', JSON.stringify(students));
}, [students])

const addStudent = (name, group) => {
    const newStudent = {
        id: Date.now(),
        name,
        group,
    }
    setStudents([...students, newStudent])
}

const deleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id))
}

const updateStudent = (updatedStudent) => {
    setStudents(students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)))
}
return{
    students,
    addStudent,
    deleteStudent,
    updateStudent,
}
}
