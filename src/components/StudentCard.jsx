/**
 * StudentCard Component
 *
 * Displays a single student's details as a card.
 * Shows avatar (initials), name, roll number, marks (color-coded), grade badge,
 * and a delete button.
 *
 * Props:
 *  - student (object): { rollNo, name, marks }
 *  - onDelete (function): Callback invoked with rollNo when delete is clicked.
 */
function StudentCard({ student, onDelete }) {
  const { rollNo, name, marks } = student;

  /**
   * Determines the letter grade based on marks.
   */
  const getGrade = (marks) => {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B';
    if (marks >= 60) return 'C';
    if (marks >= 50) return 'D';
    return 'F';
  };

  /**
   * Returns the CSS modifier class based on marks range.
   */
  const getMarksClass = (marks) => {
    if (marks >= 70) return 'student-card__marks-value--high';
    if (marks >= 40) return 'student-card__marks-value--mid';
    return 'student-card__marks-value--low';
  };

  /**
   * Returns a CSS modifier class for the grade badge.
   */
  const getGradeBadgeClass = (grade) => {
    if (grade.startsWith('A')) return 'student-card__grade--A';
    if (grade === 'B') return 'student-card__grade--B';
    if (grade === 'C' || grade === 'D') return 'student-card__grade--C';
    return 'student-card__grade--F';
  };

  // Extract first letter of name for avatar
  const initial = name.charAt(0).toUpperCase();
  const grade = getGrade(marks);

  return (
    <div className="student-card" id={`student-card-${rollNo}`}>
      {/* Student info: avatar + name/roll */}
      <div className="student-card__info">
        <div className="student-card__avatar">{initial}</div>
        <div className="student-card__details">
          <p className="student-card__name">{name}</p>
          <p className="student-card__roll">Roll No: {rollNo}</p>
        </div>
      </div>

      {/* Marks and grade */}
      <div className="student-card__marks-wrapper">
        <div className="student-card__marks">
          <p className={`student-card__marks-value ${getMarksClass(marks)}`}>
            {marks}
          </p>
          <p className="student-card__marks-label">Marks</p>
        </div>

        <span className={`student-card__grade ${getGradeBadgeClass(grade)}`}>
          {grade}
        </span>

        {/* Delete button — triggers onDelete with the student's roll number */}
        <button
          className="student-card__delete"
          onClick={() => onDelete(rollNo)}
          title={`Delete ${name}`}
          id={`delete-btn-${rollNo}`}
          aria-label={`Delete student ${name}`}
        >
          🗑
        </button>
      </div>
    </div>
  );
}

export default StudentCard;
