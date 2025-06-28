// pages/index.js

export default function Home() {
  return (
    <div style={styles.hero}>
      <div style={styles.overlay}>
        <div style={styles.content}>
          <h1 style={styles.heading}>Welcome to 📝 MyBlog</h1>
          <p style={styles.tagline}>
            Share your thoughts with the world.<br /> Create, edit, and publish rich blog posts easily.
          </p>
          <p style={styles.actions}>
            👉 Use the navbar above to <strong>write</strong> or <strong>manage</strong> your posts.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  hero: {
    backgroundImage: `url("https://png.pngtree.com/thumb_back/fw800/background/20240401/pngtree-blank-notepad-page-in-bullet-journal-on-bright-yellow-office-desktop-image_15649055.jpg")`,
     backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  content: {
    textAlign: 'center',
    color: 'white',
    maxWidth: '800px',
    width: '100%',
  },
  heading: {
    fontSize: '3rem',
    marginBottom: '1rem',
    
  },
  tagline: {
    fontSize: '1.3rem',
    lineHeight: '1.6',
  },
  actions: {
    marginTop: '2rem',
    fontSize: '1rem',
  },
  // Animations
  fadeInDown: {
    animation: 'fadeInDown 1s ease-out',
  },
  fadeInUp: {
    animation: 'fadeInUp 1.2s ease-out',
  },
  fadeIn: {
    animation: 'fadeIn 1.5s ease-out',
  },
};
