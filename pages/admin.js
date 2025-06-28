// pages/admin.js
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data.posts));
  }, []);

  const handleDelete = async (slug) => {
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;

    const res = await fetch(`/api/posts/${slug}`, {
      method: 'DELETE',
    });

    const data = await res.json();
    if (data.success) {
      alert('Post deleted!');
      setPosts(posts.filter(post => post.slug !== slug));
    } else {
      alert('Delete failed.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🛠 Admin Dashboard</h1>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post._id} style={{ marginBottom: '1rem' }}>
              <strong>{post.title}</strong> <br />
              <Link href={`/posts/${post.slug}`}>View</Link> |{' '}
              <Link href={`/edit/${post.slug}`}>Edit</Link> |{' '}
              <button onClick={() => handleDelete(post.slug)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
