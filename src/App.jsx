import { useState } from 'react';
import './App.css';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import Toast from './components/Toast';

/**
 * App Component (Root)
 *
 * The top-level component that manages the full list of students
 * using the useState hook. It passes data (props) down to child
 * components and receives events (callbacks) back up.
 *
 * React Concepts Demonstrated:
 *  - Components (StudentForm, StudentList, StudentCard, Toast)
 *  - JSX (declarative UI)
 *  - Props (passing data & callbacks to children)
 *  - useState (managing students array, toast state)
 *  - Event Handling (form submit, delete click)
 *  - Form Handling (controlled inputs in StudentForm)
 *  - Conditional Rendering (empty state, error messages, toast)
 *  - Basic Validation (field checks in StudentForm)
 */
function App() {
  // ─── State: list of student objects ───
  const [students, setStudents] = useState([]);

  // ─── State: toast notification ───
  const [toast, setToast] = useState({ message: '', visible: false });

  /**
   * Shows a toast notification for 2.5 seconds.
   */
  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2500);
  };

  /**
   * Adds a new student to the list.
   * Called by StudentForm via props.
   */
  const handleAddStudent = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
    showToast(`${newStudent.name} added successfully!`);
  };

  /**
   * Deletes a student by roll number.
   * Called by StudentCard (through StudentList) via props.
   */
  const handleDeleteStudent = (rollNo) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.rollNo !== rollNo)
    );
    showToast('Student record deleted');
  };

  // ─── Computed stats ───
  const totalStudents = students.length;
  const averageMarks =
    totalStudents > 0
      ? Math.round(students.reduce((sum, s) => sum + s.marks, 0) / totalStudents)
      : 0;
  const topMarks =
    totalStudents > 0 ? Math.max(...students.map((s) => s.marks)) : 0;

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="app-header__icon">🎓</div>
        <h1>Student Management System</h1>
        <p className="app-header__subtitle">
          Manage student records with ease — add, view, and remove entries.
        </p>

        {/* Conditional rendering: only show stats when students exist */}
        {totalStudents > 0 && (
          <div className="stats-bar">
            <div className="stat-chip">
              <span className="stat-chip__icon">👥</span>
              Total: <span className="stat-chip__value">{totalStudents}</span>
            </div>
            <div className="stat-chip">
              <span className="stat-chip__icon">📈</span>
              Average: <span className="stat-chip__value">{averageMarks}%</span>
            </div>
            <div className="stat-chip">
              <span className="stat-chip__icon">🏆</span>
              Highest: <span className="stat-chip__value">{topMarks}%</span>
            </div>
          </div>
        )}
      </header>

      {/* ── Main Grid: Form + List ── */}
      <div className="app-grid">
        {/* Pass callback and existing rolls as props */}
        <StudentForm
          onAddStudent={handleAddStudent}
          existingRolls={students.map((s) => s.rollNo)}
        />

        {/* Pass students array and delete callback as props */}
        <StudentList
          students={students}
          onDelete={handleDeleteStudent}
        />
      </div>

      {/* Toast notification */}
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}

export default App;
