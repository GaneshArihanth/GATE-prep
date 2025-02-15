import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Contest.css';

const Contest = () => {
    const [tests, setTests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Listen for tests
        const testsRef = collection(db, 'Tests');
        const q = query(testsRef, orderBy('startTime', 'desc'));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const testsList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                startTime: doc.data().startTime?.toDate(),
                endTime: doc.data().endTime?.toDate()
            }));
            setTests(testsList);
        });

        return () => unsubscribe();
    }, []);

    const getTestStatus = (startTime, endTime) => {
        const now = new Date();
        if (now < startTime) return 'upcoming';
        if (now >= startTime && now <= endTime) return 'active';
        return 'completed';
    };

    const handleTestClick = (test) => {
        const status = getTestStatus(test.startTime, test.endTime);
        if (status === 'active') {
            navigate('/test-room');
        }
    };

    const formatDate = (date) => {
        return date?.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTimeRemaining = (startTime) => {
        const now = new Date();
        const diff = startTime - now;
        
        if (diff <= 0) return '';
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        return `Starts in: ${days}d ${hours}h ${minutes}m`;
    };

    return (
        <div className="contest-container">
            <div className="contest-header">
                <h1 className="contest-title">Contests</h1>
            </div>
            
            <div className="tests-grid">
                {tests.map((test) => {
                    const status = getTestStatus(test.startTime, test.endTime);
                    return (
                        <div 
                            key={test.id} 
                            className={`test-card ${status}`}
                            onClick={() => handleTestClick(test)}
                        >
                            <h2 className="test-title">{test.title}</h2>
                            <div className="test-details">
                                <p><strong>Start:</strong> {formatDate(test.startTime)}</p>
                                <p><strong>End:</strong> {formatDate(test.endTime)}</p>
                                <p><strong>Duration:</strong> {
                                    Math.floor((test.endTime - test.startTime) / (1000 * 60))
                                } minutes</p>
                                {status === 'upcoming' && (
                                    <p className="time-remaining">{getTimeRemaining(test.startTime)}</p>
                                )}
                                <div className={`status-badge ${status}`}>
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Contest;
