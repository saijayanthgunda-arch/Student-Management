import { useState } from 'react';
import './StudentForm.css';

/**
 * StudentForm Component
 * 
 * Renders a form with inputs for Roll Number, Name, and Marks.
 * Validates all fields before submission and passes data to the parent
 * component via the onAddStudent prop.
 *
 * Props:
 *  - onAddStudent (function): callback that receives { rollNo, name, marks }
 *  - existingRollNumbers (array): list of existing roll numbers for duplicate check
 */
function StudentForm({ onAddStudent, existingRollNumbers }) {
  // useState hooks for each form field
  const [rollNo, setRollNo] = useState('');
  const [name, setName] = useState('');
  const [marks, setMarks] = useState('');

  // useState for form validation errors
  const [errors, setErrors] = useState({});

  // useState for success animation feedback
  const [showSuccess, setShowSuccess] = useState(false);

  /**
   * validate()
   * Checks every field for emptiness and applies business rules:
   *  - Roll No must be a positive integer
   *  - Name must contain only letters and spaces
   *  - Marks must be 0–100
   *  - Roll No must not already exist
   * Returns an errors object; empty object means valid.
   */
  const validate = () => {
    const newErrors = {};

    // Roll Number validation
    if (!rollNo.trim()) {
      newErrors.rollNo = 'Roll Number is required';
    } else if (!/^\d+$/.test(rollNo.trim())) {
      newErrors.rollNo = 'Roll Number must be a positive integer';
    } else if (existingRollNumbers.includes(rollNo.trim())) {
      newErrors.rollNo = 'This Roll Number already exists';
    }

    // Name validation
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      newErrors.name = 'Name can only contain letters and spaces';
    }

    // Marks validation
    if (!marks.trim()) {
      newErrors.marks = 'Marks are required';
    } else if (isNaN(marks) || Number(marks) < 0 || Number(marks) > 100) {
      newErrors.marks = 'Marks must be between 0 and 100';
    }

    return newErrors;
  };

  /**
   * handleSubmit(e)
   * Event handler for form submission.
   * Prevents default, validates, and either shows errors
   * or calls the parent callback and resets the form.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear errors and pass data up via props
    setErrors({});
    onAddStudent({
      rollNo: rollNo.trim(),
      name: name.trim(),
      marks: Number(marks),
    });

    // Show success animation
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1500);

    // Reset form fields
    setRollNo('');
    setName('');
    setMarks('');
  };

  /**
   * getGradePreview()
   * Conditional rendering helper — shows a live grade preview
   * as the user types marks.
   */
  const getGradePreview = () => {
    const m = Number(marks);
    if (!marks || isNaN(m) || m < 0 || m > 100) return null;
    if (m >= 90) return { grade: 'A+', color: '#22c55e', label: 'Outstanding' };
    if (m >= 80) return { grade: 'A', color: '#34d399', label: 'Excellent' };
    if (m >= 70) return { grade: 'B+', color: '#60a5fa', label: 'Very Good' };
    if (m >= 60) return { grade: 'B', color: '#818cf8', label: 'Good' };
    if (m >= 50) return { grade: 'C', color: '#f59e0b', label: 'Average' };
    if (m >= 40) return { grade: 'D', color: '#f97316', label: 'Below Average' };
    return { grade: 'F', color: '#ef4444', label: 'Fail' };
  };

  const gradePreview = getGradePreview();

  return (
    <div className="form-container animate-fade-in-up">
      {/* Form Header */}
      <div className="form-header">
        <div className="form-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
          </svg>
        </div>
        <div>
          <h2 className="form-title">Add New Student</h2>
          <p className="form-subtitle">Fill in the details below to register a student</p>
        </div>
      </div>

      {/* Success feedback - conditional rendering */}
      {showSuccess && (
        <div className="success-banner animate-scale-in">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>Student added successfully!</span>
        </div>
      )}

      {/* Form with event handling */}
      <form onSubmit={handleSubmit} className="student-form" id="student-form" noValidate>
        {/* Roll Number Field */}
        <div className={`form-group ${errors.rollNo ? 'has-error' : ''}`}>
          <label htmlFor="rollNo" className="form-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="18" rx="2" />
              <line x1="8" y1="7" x2="16" y2="7" />
              <line x1="8" y1="11" x2="16" y2="11" />
              <line x1="8" y1="15" x2="12" y2="15" />
            </svg>
            Roll Number
          </label>
          <input
            type="text"
            id="rollNo"
            className="form-input"
            placeholder="e.g. 101"
            value={rollNo}
            onChange={(e) => {
              setRollNo(e.target.value);
              if (errors.rollNo) setErrors({ ...errors, rollNo: '' });
            }}
          />
          {/* Conditional rendering for error message */}
          {errors.rollNo && <span className="error-text">{errors.rollNo}</span>}
        </div>

        {/* Name Field */}
        <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
          <label htmlFor="name" className="form-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Student Name
          </label>
          <input
            type="text"
            id="name"
            className="form-input"
            placeholder="e.g. John Doe"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        {/* Marks Field */}
        <div className={`form-group ${errors.marks ? 'has-error' : ''}`}>
          <label htmlFor="marks" className="form-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            Marks (0–100)
          </label>
          <div className="marks-input-wrapper">
            <input
              type="number"
              id="marks"
              className="form-input"
              placeholder="e.g. 85"
              min="0"
              max="100"
              value={marks}
              onChange={(e) => {
                setMarks(e.target.value);
                if (errors.marks) setErrors({ ...errors, marks: '' });
              }}
            />
            {/* Conditional rendering for live grade preview */}
            {gradePreview && (
              <div className="grade-preview animate-scale-in" style={{ '--grade-color': gradePreview.color }}>
                <span className="grade-letter">{gradePreview.grade}</span>
                <span className="grade-label">{gradePreview.label}</span>
              </div>
            )}
          </div>
          {errors.marks && <span className="error-text">{errors.marks}</span>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn" id="add-student-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Student
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
