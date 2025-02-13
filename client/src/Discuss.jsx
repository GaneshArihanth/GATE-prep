import React, { useState } from "react";
import "./Discuss.css";

const Discuss = () => {
  const [posts, setPosts] = useState([
    { id: 1, user: "Alice", content: "How do I approach dynamic programming problems?" },
    { id: 2, user: "Bob", content: "What are the best resources for GATE preparation?" },
  ]);
  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (newPost.trim()) {
      setPosts([...posts, { id: posts.length + 1, user: "You", content: newPost }]);
      setNewPost("");
    }
  };

  return (
    <div className="discussion-container full-screen">
      <h2>Discussion Forum</h2>
      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <strong>{post.user}:</strong> {post.content}
          </div>
        ))}
      </div>
      <div className="post-input">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Start a discussion..."
        />
        <button className="post-btn" onClick={handlePost}>Post</button>
      </div>
    </div>
  );
};

export default Discuss;
