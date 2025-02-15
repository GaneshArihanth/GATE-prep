import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, limit, onSnapshot, doc, updateDoc, arrayUnion, Timestamp, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { FaClock } from 'react-icons/fa';
import './TestRoom.css';

const TestRoom = () => {
    const [activeTest, setActiveTest] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentAnswers, setCurrentAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);
    const currentUser = auth.currentUser;
    const navigate = useNavigate();

    useEffect(() => {
        // Listen for active test
        const testsRef = collection(db, 'Tests');
        const q = query(testsRef, orderBy('startTime', 'desc'), limit(1));
        
        const unsubscribe = onSnapshot(q, async (snapshot) => {
            console.log('Snapshot received:', snapshot); // Log snapshot
            if (!snapshot.empty) {
                const testData = snapshot.docs[0].data();
                const testId = snapshot.docs[0].id;
                console.log('Active test data:', testData);
                
                // Convert timestamps to milliseconds for comparison
                const now = Timestamp.now().toMillis();
                const startTime = testData.startTime.toMillis();
                const endTime = testData.endTime.toMillis();
                
                console.log('Time comparison:', {
                    now: new Date(now).toLocaleString(),
                    startTime: new Date(startTime).toLocaleString(),
                    endTime: new Date(endTime).toLocaleString(),
                    isActive: now >= startTime && now <= endTime
                });

                // Check if user has already attempted this test
                const hasAttempted = testData.submissions?.some(
                    submission => submission.userId === currentUser?.uid
                ) ?? false;

                // Only set active test if it's ongoing and not attempted
                if (now >= startTime && now <= endTime && !hasAttempted) {
                    console.log('Setting active test and fetching questions');
                    setActiveTest({ id: testId, ...testData });
                    setTimeLeft(Math.floor((endTime - now) / 1000));
                    fetchQuestions(testData.mcqQuestions, testData.natQuestions);
                } else {
                    console.log('Test is not currently active');
                }
            } else {
                console.log('No active test found.'); // Log when no active test is found
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (timeLeft === 0 && activeTest) {
            submitTest();
        }
    }, [timeLeft]);

    const fetchQuestions = async (mcqIds, natIds) => {
        console.log('Fetching questions for MCQ IDs:', mcqIds, 'and NAT IDs:', natIds); // Log question IDs
        try {
            // Fetch MCQ questions
            const mcqQuestions = await Promise.all(
                mcqIds.map(async (id) => {
                    const docRef = doc(db, 'MCQ_Questions', id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        console.log('MCQ question fetched:', docSnap.data()); // Log fetched MCQ question
                        return { id: docSnap.id, ...docSnap.data(), type: 'mcq' };
                    }
                    return null;
                })
            );

            // Fetch NAT questions
            const natQuestions = await Promise.all(
                natIds.map(async (id) => {
                    const docRef = doc(db, 'NAT_Questions', id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        console.log('NAT question fetched:', docSnap.data()); // Log fetched NAT question
                        return { id: docSnap.id, ...docSnap.data(), type: 'nat' };
                    }
                    return null;
                })
            );

            // Combine and filter out any null values
            const allQuestions = [...mcqQuestions, ...natQuestions].filter(q => q !== null);
            console.log('All questions fetched:', allQuestions); // Log all fetched questions
            setQuestions(allQuestions);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleAnswerChange = (questionId, answer) => {
        setCurrentAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const submitTest = async () => {
        if (!activeTest || !currentUser) return;

        try {
            const submissionRef = doc(db, 'Tests', activeTest.id);
            await updateDoc(submissionRef, {
                submissions: arrayUnion({
                    userId: currentUser.uid,
                    answers: currentAnswers,
                    submittedAt: Timestamp.now()
                })
            });

            navigate('/contest'); // Redirect to contest page after submission
        } catch (error) {
            console.error("Error submitting test:", error);
        }
    };

    if (!activeTest) {
        return (
            <div className="test-room-container">
                <div className="no-test-message">
                    {currentUser ? 
                        "No active test available or you have already attempted the current test." :
                        "Please log in to access tests."}
                </div>
            </div>
        );
    }

    return (
        <div className="test-room-container">
            <div className="test-header">
                <h2 className="test-title">{activeTest.title}</h2>
                <div className="timer">
                    <FaClock />
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
            </div>

            <div className="questions-container">
                {questions.map((question) => (
                    <div key={question.id} className="question-card">
                        <div className={`question-type-badge ${question.type}`}>
                            {question.type === 'mcq' ? 'Multiple Choice' : 'Fill in the Blank'}
                        </div>
                        <p className="question-text">{question.questionText}</p>
                        
                        {question.type === 'mcq' ? (
                            <div className="options-grid">
                                {question.options.map((option, index) => (
                                    <label key={index} className="option-item">
                                        <input
                                            type="radio"
                                            name={question.id}
                                            value={option}
                                            checked={currentAnswers[question.id] === option}
                                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                        />
                                        <span>{option}</span>
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <input
                                type="text"
                                value={currentAnswers[question.id] || ''}
                                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                placeholder="Type your answer here..."
                                className="nat-input"
                            />
                        )}
                    </div>
                ))}
            </div>

            <button
                onClick={submitTest}
                className="submit-button"
            >
                Submit Test
            </button>
        </div>
    );
};

export default TestRoom;
