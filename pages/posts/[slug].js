// pages/posts/[slug].js

import Head from 'next/head';
import dbConnect from '../../lib/dbconnect';
import Post from '../../models/Post';

export async function getServerSideProps(context) {
  await dbConnect();
  const { slug } = context.params;

  const post = await Post.findOne({ slug }).lean();

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      title: post.title,
      content: post.content,
      createdAt: new Date(post.createdAt).toLocaleString(),
    },
  };
}

export default function PostPage({ title, content, createdAt }) {
  // Strip HTML for meta description
  const plainTextContent = content.replace(/<[^>]+>/g, '').slice(0, 150);

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '2rem' }}>
      <Head>
        <title>{title} | My Blog</title>
        <meta name="description" content={plainTextContent} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={plainTextContent} />
      </Head>

      <h1>{title}</h1>
      <p><em>{createdAt}</em></p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
