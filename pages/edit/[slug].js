// pages/edit/[slug].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function EditPost() {
  const router = useRouter();
  const { slug } = router.query;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/posts/${slug}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.post.title);
        setContent(data.post.content);
      });
  }, [slug]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/posts/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.json();
    if (data.success) {
      setMessage('✅ Post updated!');
      setTimeout(() => router.push('/admin'), 1500);
    } else {
      setMessage('❌ Update failed.');
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', padding: '2rem' }}>
      <h2>Edit Post</h2>
      <form onSubmit={handleUpdate}>
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
          Update Post
        </button>
      </form>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}
