import React, { useState } from 'react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { toast } from 'react-toastify';
import './QuestionAttempt.css';

const QuestionAttempt = ({ question, onClose, onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const options = [
    { id: 'A', text: 'Option A' },
    { id: 'B', text: 'Option B' },
    { id: 'C', text: 'Option C' },
    { id: 'D', text: 'Option D' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOption) {
      toast.error('Please select an option');
      return;
    }

    setIsSubmitting(true);
    try {
      const userId = auth.currentUser.uid;
      const userProgressRef = doc(db, 'userProgress', userId);

      // Calculate score (for demo, we'll use a random score between 0 and 1)
      const score = Math.random();

      // Update user progress
      await updateDoc(userProgressRef, {
        completedProblems: arrayUnion({
          id: question.id,
          subject: question.subject,
          topic: question.topic,
          score: score,
          selectedOption,
          explanation,
          attemptedAt: new Date().toISOString()
        })
      });

      toast.success('Answer submitted successfully!');
      onSubmit(score);
      onClose();
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast.error('Failed to submit answer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="question-attempt-overlay">
      <div className="question-attempt-modal">
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="question-header">
          <span className={`difficulty ${question.difficulty.toLowerCase()}`}>
            {question.difficulty}
          </span>
          <span className="subject">{question.subject}</span>
          <span className="topic">{question.topic}</span>
        </div>

        <h2>{question.title}</h2>
        <p className="description">{question.description}</p>
        <div className="question-text">{question.text}</div>

        <form onSubmit={handleSubmit}>
          <div className="options-container">
            {options.map(option => (
              <label key={option.id} className="option-label">
                <input
                  type="radio"
                  name="answer"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <span className="option-text">{option.text}</span>
              </label>
            ))}
          </div>

          <div className="explanation-container">
            <label htmlFor="explanation">Explanation (Optional):</label>
            <textarea
              id="explanation"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Explain your reasoning..."
              rows="3"
            />
          </div>

          <div className="button-container">
            <button 
              type="button" 
              className="cancel-button"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Answer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionAttempt;
