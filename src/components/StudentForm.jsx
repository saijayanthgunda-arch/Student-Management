import { useState } from 'react';

/**
 * StudentForm Component
 *
 * Renders a form with fields for Roll Number, Name, and Marks.
 * Handles validation and passes new student data to the parent via onAddStudent prop.
 *
 * Props:
 *  - onAddStudent (function): Callback invoked with the new student object { rollNo, name, marks }.
 *  - existingRolls (array): Array of existing roll numbers to prevent duplicates.
 */
function StudentForm({ onAddStudent, existingRolls }) {
  // ─── State for form fields ───
  const [rollNo, setRollNo] = useState('');
  const [name, setName] = useState('');
  const [marks, setMarks] = useState('');

  // ─── State for per-field validation errors ───
  const [errors, setErrors] = useState({});

  /**
   * Validates all form fields.
   * Returns an object mapping field names to error messages (empty if valid).
   */
  const validate = () => {
    const newErrors = {};

    // Roll Number validation
    if (!rollNo.trim()) {
      newErrors.rollNo = 'Roll Number is required';
    } else if (existingRolls.includes(rollNo.trim())) {
      newErrors.rollNo = 'This Roll Number already exists';
    }

    // Name validation
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Marks validation
    if (!marks.toString().trim()) {
      newErrors.marks = 'Marks are required';
    } else if (isNaN(marks) || Number(marks) < 0 || Number(marks) > 100) {
      newErrors.marks = 'Enter a valid number between 0 and 100';
    }

    return newErrors;
  };

  /**
   * Handles form submission.
   * Validates fields; if valid, calls onAddStudent and resets the form.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    // If there are validation errors, stop submission
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Pass new student object to parent
    onAddStudent({
      rollNo: rollNo.trim(),
      name: name.trim(),
      marks: Number(marks),
    });

    // Reset form fields and errors
    setRollNo('');
    setName('');
    setMarks('');
    setErrors({});
  };

  return (
    <div className="form-card">
      <h2 className="form-card__title">
        <span className="form-card__title-icon">📝</span>
        Add New Student
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Roll Number Field */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="rollNo">
            Roll Number
          </label>
          <div className="form-group__input-wrapper">
            <span className="form-group__input-icon">🔢</span>
            <input
              id="rollNo"
              className={`form-group__input ${errors.rollNo ? 'form-group__input--error' : ''}`}
              type="text"
              placeholder="e.g. 101"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
            />
          </div>
          {/* Conditional rendering: show error if validation failed */}
          {errors.rollNo && (
            <p className="form-group__error">
              <span>⚠</span> {errors.rollNo}
            </p>
          )}
        </div>

        {/* Name Field */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="studentName">
            Student Name
          </label>
          <div className="form-group__input-wrapper">
            <span className="form-group__input-icon">👤</span>
            <input
              id="studentName"
              className={`form-group__input ${errors.name ? 'form-group__input--error' : ''}`}
              type="text"
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {errors.name && (
            <p className="form-group__error">
              <span>⚠</span> {errors.name}
            </p>
          )}
        </div>

        {/* Marks Field */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="marks">
            Marks (0 – 100)
          </label>
          <div className="form-group__input-wrapper">
            <span className="form-group__input-icon">📊</span>
            <input
              id="marks"
              className={`form-group__input ${errors.marks ? 'form-group__input--error' : ''}`}
              type="number"
              min="0"
              max="100"
              placeholder="e.g. 85"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
            />
          </div>
          {errors.marks && (
            <p className="form-group__error">
              <span>⚠</span> {errors.marks}
            </p>
          )}
        </div>

        <button type="submit" className="form-card__submit" id="addStudentBtn">
          <span>➕</span>
          Add Student
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
