/**
 * Toast Component
 *
 * A small notification that appears at the bottom of the screen
 * to give the user feedback about actions (add / delete).
 *
 * Props:
 *  - message (string): The text to display.
 *  - visible (boolean): Whether the toast is currently visible.
 */
function Toast({ message, visible }) {
  return (
    <div className={`toast ${visible ? 'toast--visible' : ''}`}>
      <span className="toast__icon">✅</span>
      {message}
    </div>
  );
}

export default Toast;
