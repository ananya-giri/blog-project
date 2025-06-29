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
      alert('✅ Post deleted!');
      setPosts(posts.filter(post => post.slug !== slug));
    } else {
      alert('❌ Delete failed.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🛠 Admin Dashboard</h1>
      {posts.length === 0 ? (
        <p style={styles.noPosts}>No posts found.</p>
      ) : (
        <div style={styles.grid}>
          {posts.map(post => (
            <div key={post._id} style={styles.card}>
              <h3 style={styles.title}>{post.title}</h3>
              <div style={styles.actions}>
                <Link href={`/posts/${post.slug}`} style={styles.button}>👁 View</Link>
                <Link href={`/edit/${post.slug}`} style={styles.button}>✏️ Edit</Link>
                <button onClick={() => handleDelete(post.slug)} style={{ ...styles.button, ...styles.delete }}>
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '900px',
    margin: 'auto',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '2rem',
  },
  noPosts: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#777',
  },
  grid: {
    display: 'grid',
    gap: '1.5rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  },
  card: {
    background: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: '#333',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  button: {
    background: '#0070f3',
    color: '#fff',
    padding: '0.5rem 1rem',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '0.9rem',
    border: 'none',
    cursor: 'pointer',
  },
  delete: {
    background: '#e00',
  },
};
