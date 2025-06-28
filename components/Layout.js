// components/Layout.js
import Link from 'next/link';
import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>My Blog</title>
      </Head>
      <header style={styles.header}>
        <div style={styles.navContainer}>
  <div style={styles.logo}>
    <Link href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' }}>
      📝 MyBlog
    </Link>
  </div>
  <nav style={styles.nav}>
    <Link href="/" style={styles.link}>Home</Link>
    <Link href="/admin" style={styles.link}>Admin</Link>
    <Link href="/create" style={styles.link}>Create</Link>
  </nav>
</div>

      </header>
      <main style={styles.main}>{children}</main>
    </>
  );
};

const styles = {
  header: {
    backgroundColor: '#1a1a1a',
    padding: '1rem 2rem',
    color: 'white',
  },
  nav: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  link: {
    color: 'white',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  main: {
    padding: '2rem',
    maxWidth: '900px',
    margin: '0 auto',
  },
};

export default Layout;
