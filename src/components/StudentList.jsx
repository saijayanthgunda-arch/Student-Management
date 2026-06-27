import StudentCard from './StudentCard';

/**
 * StudentList Component
 *
 * Renders either the list of StudentCards or an empty state message.
 * Uses conditional rendering to switch between the two views.
 *
 * Props:
 *  - students (array): Array of student objects [{ rollNo, name, marks }, ...]
 *  - onDelete (function): Callback passed down to each StudentCard for deletion.
 */
function StudentList({ students, onDelete }) {
  return (
    <section className="student-list-section">
      {/* Section Header */}
      <div className="student-list-section__header">
        <h2 className="student-list-section__title">
          📋 Student Records
        </h2>
        {students.length > 0 && (
          <span className="student-list-section__count">
            {students.length} {students.length === 1 ? 'student' : 'students'}
          </span>
        )}
      </div>

      {/* Conditional Rendering: show list or empty state */}
      {students.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">🎓</div>
          <h3 className="empty-state__title">No students yet</h3>
          <p className="empty-state__desc">
            Add your first student using the form to get started.
          </p>
        </div>
      ) : (
        <div>
          {/* Dynamically render a StudentCard for each student */}
          {students.map((student) => (
            <StudentCard
              key={student.rollNo}
              student={student}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default StudentList;
