import React, { useState } from 'react';
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { toast } from 'react-toastify';
import './QuestionAttempt.css';

const QuestionAttempt = ({ question, onClose, onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateOptions = () => {
    const uniqueOptions = [];
    const optionCount = 4; // Number of options to generate
    const existingOptions = new Set();

    while (uniqueOptions.length < optionCount) {
      const randomOption = `Option ${String.fromCharCode(65 + uniqueOptions.length)}`;
      if (!existingOptions.has(randomOption)) {
        uniqueOptions.push({ id: String.fromCharCode(65 + uniqueOptions.length), text: randomOption });
        existingOptions.add(randomOption);
      }
    }
    return uniqueOptions;
  };

  const options = generateOptions();

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!selectedOption) {
          toast.error('Please select an option');
          return;
      }
  
      setIsSubmitting(true);
      try {
          const user = auth.currentUser;
          if (!user) {
              toast.error('User not authenticated.');
              return;
          }
          const userId = user.uid;
          const userProgressRef = doc(db, 'userProgress', userId);

          // Check if the document exists
          const userProgressDoc = await getDoc(userProgressRef);
          if (!userProgressDoc.exists()) {
              // Create the document if it doesn't exist
              await setDoc(userProgressRef, {});
          }

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
                  options, // Save generated options
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
