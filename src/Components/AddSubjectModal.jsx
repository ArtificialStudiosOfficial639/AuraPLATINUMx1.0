import React, { useState } from 'react';

/**
 * AddSubjectModal / Inline Form
 * Collects subject details using controlled React state.
 */
function AddSubjectModal({ isOpen, onClose, onAddSubject }) {
  const [name, setName] = useState('');
  const [marksScored, setMarksScored] = useState('');
  const [totalMarks, setTotalMarks] = useState('100');
  const [targetPercentage, setTargetPercentage] = useState('85');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      setError('Please provide a subject name.');
      return;
    }

    const scored = Number(marksScored);
    const total = Number(totalMarks);
    const target = Number(targetPercentage);

    if (isNaN(scored) || isNaN(total) || total <= 0) {
      setError('Enter valid positive numbers for marks.');
      return;
    }

    if (scored > total) {
      setError('Scored marks cannot exceed total marks.');
      return;
    }

    // Pass data up to parent
    onAddSubject({
      id: Date.now(), // Lightweight unique identifier
      name: name.trim(),
      marksScored: scored,
      totalMarks: total,
      targetPercentage: target || 80,
    });

    // Reset local state and close
    setName('');
    setMarksScored('');
    setTotalMarks('100');
    setTargetPercentage('85');
    setError('');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Log Subject Score</h3>
          <button type="button" className="close-btn" onClick={onClose}>✕</button>
        </div>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit} className="subject-form">
          <div className="form-group">
            <label htmlFor="subject-name">Subject Name</label>
            <input
              id="subject-name"
              type="text"
              placeholder="e.g. Mathematics, Science"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="marks-scored">Marks Scored</label>
              <input
                id="marks-scored"
                type="number"
                min="0"
                placeholder="88"
                value={marksScored}
                onChange={(e) => setMarksScored(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="total-marks">Total Marks</label>
              <input
                id="total-marks"
                type="number"
                min="1"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="target-pct">Target Goal (%)</label>
            <input
              id="target-pct"
              type="number"
              min="1"
              max="100"
              value={targetPercentage}
              onChange={(e) => setTargetPercentage(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Subject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSubjectModal;