import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import { doc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import './Discussion.css';

const DiscussionCard = ({ discussion, onReplyAdded }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [error, setError] = useState(null);

  const handleReply = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      setError('Please sign in to reply');
      return;
    }

    if (!replyContent.trim()) {
      setError('Reply cannot be empty');
      return;
    }

    try {
      const discussionRef = doc(db, 'discussions', discussion.id);
      const reply = {
        content: replyContent,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || 'Anonymous',
        timestamp: serverTimestamp()
      };

      await updateDoc(discussionRef, {
        replies: arrayUnion(reply)
      });

      setReplyContent('');
      setShowReplyForm(false);
      setError(null);
      if (onReplyAdded) onReplyAdded();
    } catch (err) {
      console.error('Error adding reply:', err);
      setError('Failed to add reply. Please try again.');
    }
  };

  return (
    <div className="discussion-card">
      <div className="discussion-header">
        <h3>{discussion.title}</h3>
        <span className="subject-tag">{discussion.subject}</span>
      </div>
      <p className="discussion-content">{discussion.content}</p>
      <div className="discussion-meta">
        <span className="author">Posted by {discussion.userName}</span>
        <span className="timestamp">
          {discussion.timestamp?.toDate().toLocaleDateString()}
        </span>
      </div>

      <div className="discussion-replies">
        {discussion.replies && discussion.replies.length > 0 && (
          <div className="replies-section">
            <h4>Replies ({discussion.replies.length})</h4>
            {discussion.replies.map((reply, index) => (
              <div key={index} className="reply-card">
                <p className="reply-content">{reply.content}</p>
                <div className="reply-meta">
                  <span className="author">Replied by {reply.userName}</span>
                  <span className="timestamp">
                    {reply.timestamp?.toDate().toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!showReplyForm ? (
          <button 
            className="reply-btn"
            onClick={() => setShowReplyForm(true)}
          >
            Reply to Discussion
          </button>
        ) : (
          <form onSubmit={handleReply} className="reply-form">
            {error && <div className="error-message">{error}</div>}
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write your reply..."
              rows="3"
              required
            />
            <div className="reply-actions">
              <button type="submit" className="submit-btn">
                Post Reply
              </button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => {
                  setShowReplyForm(false);
                  setReplyContent('');
                  setError(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default DiscussionCard;
