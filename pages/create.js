// pages/create.js
import { useState } from 'react';
import dynamic from 'next/dynamic';
import slugify from 'slugify';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Submitting post:", { title, content });

  const res = await fetch('/api/posts/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  });

  const data = await res.json();
  console.log("Response:", data);

  if (data.success) {
    setMessage('✅ Post created successfully!');
    setTitle('');
    setContent('');
  } else {
    setMessage('❌ Error creating post');
  }
};


  return (
    <div style={{ maxWidth: '700px', margin: 'auto', padding: '2rem' }}>
      <h2>Create a New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '1rem' }}
        />
        <ReactQuill value={content} onChange={setContent} />
        <button type="submit" style={{ marginTop: '1rem', padding: '10px 20px' }}>
          Create Post
        </button>
      </form>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}
