import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import DiscussionCard from './components/Discussion/DiscussionCard';
import './Discuss.css';

const Discuss = () => {
  const [discussions, setDiscussions] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', subject: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const subjects = [
    'Computer Networks',
    'Operating Systems',
    'Database Management',
    'Data Structures',
    'Algorithms',
    'General'
  ];

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    try {
      const q = query(
        collection(db, 'discussions'),
        orderBy('timestamp', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const discussionData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDiscussions(discussionData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching discussions:', err);
      setError('Failed to load discussions. Please try again later.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      setError('Please sign in to post discussions');
      return;
    }

    if (!newPost.title.trim() || !newPost.content.trim() || !newPost.subject) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const discussionRef = collection(db, 'discussions');
      await addDoc(discussionRef, {
        title: newPost.title,
        content: newPost.content,
        subject: newPost.subject,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || 'Anonymous',
        timestamp: serverTimestamp(),
        replies: []
      });

      setNewPost({ title: '', content: '', subject: '' });
      fetchDiscussions();
      setError(null);
    } catch (err) {
      console.error('Error creating discussion:', err);
      setError('Failed to create discussion. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading">Loading discussions...</div>;
  }

  return (
    <div className="discuss-container">
      <div className="discuss-header">
        <h1>Community Discussions</h1>
        <p>Share your doubts and help others learn</p>
      </div>

      <div className="new-discussion">
        <h2>Start a New Discussion</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Subject:</label>
           <select
             className="white-background"
             value={newPost.subject}
             onChange={(e) => setNewPost({ ...newPost, subject: e.target.value })}
             required
           >
             <option value="">Select a subject</option>
             {subjects.map(subject => (
               <option key={subject} value={subject}>{subject}</option>
             ))}
           </select>
          </div>

          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              placeholder="What's your question?"
              required
            />
          </div>

          <div className="form-group">
            <label>Content:</label>
            <textarea
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              placeholder="Provide more details about your question..."
              required
              rows="4"
            />
          </div>

          <button type="submit" className="submit-btn">Post Discussion</button>
        </form>
      </div>

      <div className="discussions-list">
        <h2>Recent Discussions</h2>
        {discussions.map(discussion => (
          <DiscussionCard
            key={discussion.id}
            discussion={discussion}
            onReplyAdded={fetchDiscussions}
          />
        ))}
      </div>
    </div>
  );
};

export default Discuss;
