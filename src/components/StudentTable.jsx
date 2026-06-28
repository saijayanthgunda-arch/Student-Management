import './StudentTable.css';

/**
 * StudentTable Component
 *
 * Displays the list of student records in a table format.
 * Receives student data and delete handler via props.
 * Uses conditional rendering to show an empty state when no records exist.
 *
 * Props:
 *  - students (array): list of { rollNo, name, marks } objects
 *  - onDeleteStudent (function): callback that receives the rollNo to delete
 */
function StudentTable({ students, onDeleteStudent }) {
  /**
   * getGrade(marks)
   * Returns the letter grade and associated color based on marks.
   */
  const getGrade = (marks) => {
    if (marks >= 90) return { grade: 'A+', color: '#22c55e' };
    if (marks >= 80) return { grade: 'A', color: '#34d399' };
    if (marks >= 70) return { grade: 'B+', color: '#60a5fa' };
    if (marks >= 60) return { grade: 'B', color: '#818cf8' };
    if (marks >= 50) return { grade: 'C', color: '#f59e0b' };
    if (marks >= 40) return { grade: 'D', color: '#f97316' };
    return { grade: 'F', color: '#ef4444' };
  };

  /**
   * getAverage()
   * Computes the class average marks.
   */
  const getAverage = () => {
    if (students.length === 0) return 0;
    const total = students.reduce((sum, s) => sum + s.marks, 0);
    return (total / students.length).toFixed(1);
  };

  /**
   * getTopStudent()
   * Returns the student with the highest marks.
   */
  const getTopStudent = () => {
    if (students.length === 0) return null;
    return students.reduce((top, s) => (s.marks > top.marks ? s : top), students[0]);
  };

  const average = getAverage();
  const topStudent = getTopStudent();

  return (
    <div className="table-container animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
      {/* Section Header */}
      <div className="table-header">
        <div className="table-header-left">
          <div className="table-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <h2 className="table-title">Student Records</h2>
            <p className="table-subtitle">
              {students.length} {students.length === 1 ? 'student' : 'students'} enrolled
            </p>
          </div>
        </div>

        {/* Stats badges — conditional rendering: only show if students exist */}
        {students.length > 0 && (
          <div className="stats-badges">
            <div className="stat-badge">
              <span className="stat-value">{average}</span>
              <span className="stat-label">Avg</span>
            </div>
            {topStudent && (
              <div className="stat-badge top-badge">
                <span className="stat-value">🏆 {topStudent.marks}</span>
                <span className="stat-label">Top</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Conditional rendering: show table or empty state */}
      {students.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
          </div>
          <h3 className="empty-title">No Students Yet</h3>
          <p className="empty-description">
            Add your first student using the form to get started.
          </p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="student-table" id="student-table">
            <thead>
              <tr>
                <th className="th-serial">#</th>
                <th className="th-roll">Roll No</th>
                <th className="th-name">Name</th>
                <th className="th-marks">Marks</th>
                <th className="th-grade">Grade</th>
                <th className="th-action">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Dynamic rendering using .map() */}
              {students.map((student, index) => {
                const { grade, color } = getGrade(student.marks);
                return (
                  <tr key={student.rollNo} className="student-row animate-slide-in" style={{ animationDelay: `${index * 0.05}s` }}>
                    <td className="td-serial">{index + 1}</td>
                    <td className="td-roll">
                      <span className="roll-badge">{student.rollNo}</span>
                    </td>
                    <td className="td-name">
                      <div className="student-avatar" style={{ background: `hsl(${(parseInt(student.rollNo) * 47) % 360}, 60%, 50%)` }}>
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="student-name-text">{student.name}</span>
                    </td>
                    <td className="td-marks">
                      <div className="marks-bar-wrapper">
                        <span className="marks-value">{student.marks}</span>
                        <div className="marks-bar">
                          <div
                            className="marks-bar-fill"
                            style={{
                              width: `${student.marks}%`,
                              background: color,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="td-grade">
                      <span className="grade-badge" style={{ color, borderColor: color, background: `${color}15` }}>
                        {grade}
                      </span>
                    </td>
                    <td className="td-action">
                      {/* Event handling: onClick calls onDeleteStudent via props */}
                      <button
                        className="delete-btn"
                        id={`delete-btn-${student.rollNo}`}
                        onClick={() => onDeleteStudent(student.rollNo)}
                        title={`Delete ${student.name}`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentTable;
