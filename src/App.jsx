import { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import './App.css';

/**
 * App Component (Root)
 *
 * The top-level component that manages the global state for all students.
 * Demonstrates:
 *  - useState for state management
 *  - Props for parent-to-child communication
 *  - Callback props for child-to-parent communication
 *  - Component-based architecture (App → StudentForm, StudentTable)
 */
function App() {
  // Central state: array of student objects { rollNo, name, marks }
  const [students, setStudents] = useState([]);

  // State for delete confirmation modal
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  /**
   * handleAddStudent(newStudent)
   * Adds a new student to the array via the setter function.
   * This is passed as a prop (callback) to StudentForm.
   */
  const handleAddStudent = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  /**
   * handleDeleteStudent(rollNo)
   * Opens a confirmation dialog before deleting.
   */
  const handleDeleteStudent = (rollNo) => {
    setDeleteConfirm(rollNo);
  };

  /**
   * confirmDelete()
   * Filters out the student with the matching rollNo.
   */
  const confirmDelete = () => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.rollNo !== deleteConfirm)
    );
    setDeleteConfirm(null);
  };

  /**
   * cancelDelete()
   * Closes the confirmation dialog without deleting.
   */
  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  // Extract roll numbers for duplicate validation (passed as props)
  const existingRollNumbers = students.map((s) => s.rollNo);

  // Find the student being deleted (for the confirmation modal)
  const studentToDelete = deleteConfirm
    ? students.find((s) => s.rollNo === deleteConfirm)
    : null;

  return (
    <div className="app">
      {/* Background grid pattern */}
      <div className="bg-grid" />

      {/* Header */}
      <header className="app-header animate-fade-in-up">
        <div className="header-content">
          <div className="logo-wrapper">
            <div className="logo-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <div>
              <h1 className="app-title">Student Management System</h1>
              <p className="app-tagline">Manage student records with ease</p>
            </div>
          </div>

          {/* Live counter — conditional rendering */}
          {students.length > 0 && (
            <div className="header-counter animate-scale-in">
              <span className="counter-number">{students.length}</span>
              <span className="counter-label">{students.length === 1 ? 'Student' : 'Students'}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="main-grid">
          {/* Left column: Form — pass callback and roll numbers as props */}
          <aside className="form-column">
            <StudentForm
              onAddStudent={handleAddStudent}
              existingRollNumbers={existingRollNumbers}
            />
          </aside>

          {/* Right column: Table — pass students array and delete callback as props */}
          <section className="table-column">
            <StudentTable
              students={students}
              onDeleteStudent={handleDeleteStudent}
            />
          </section>
        </div>
      </main>

      {/* Delete Confirmation Modal — conditional rendering */}
      {deleteConfirm && studentToDelete && (
        <div className="modal-overlay animate-fade-in" onClick={cancelDelete}>
          <div className="modal-content animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3 className="modal-title">Delete Student?</h3>
            <p className="modal-text">
              Are you sure you want to remove <strong>{studentToDelete.name}</strong> (Roll No: {studentToDelete.rollNo})?
              This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="modal-btn modal-btn-cancel" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="modal-btn modal-btn-delete" id="confirm-delete-btn" onClick={confirmDelete}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Built with <span className="heart">♥</span> using React &bull; Student Management System
        </p>
      </footer>
    </div>
  );
}

export default App;
