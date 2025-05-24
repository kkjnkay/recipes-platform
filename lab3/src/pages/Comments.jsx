import React, { useState, useEffect } from 'react';
import '../components/Form.css';

export default function Comments() {
  const [comments, setComments] = useState(() => JSON.parse(localStorage.getItem('comments')) || []);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && text) {
      setComments([...comments, { name, text }]);
      setName('');
      setText('');
    }
  };

  const deleteComment = (index) => {
    const copy = [...comments];
    copy.splice(index, 1);
    setComments(copy);
  };

  return (
    <div className="comments-container">
      <h2>Коментарі</h2>
      {comments.map((c, i) => (
        <div className="comment" key={i}>
          <div>
            <strong>{c.name}:</strong>
            <p>{c.text}</p>
          </div>
          <button onClick={() => deleteComment(i)}>Видалити</button>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="comment-form">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше ім'я" required />
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Ваш коментар" required />
        <button type="submit">Надіслати</button>
      </form>
    </div>
  );
}