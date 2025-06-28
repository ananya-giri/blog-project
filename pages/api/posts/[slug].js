// pages/api/posts/[slug].js
import dbConnect from '../../../lib/dbconnect';
import Post from '../../../models/Post';
import slugify from 'slugify';


export default async function handler(req, res) {
  await dbConnect();
  const { slug } = req.query;

  if (req.method === 'GET') {
    const post = await Post.findOne({ slug }).lean();
    if (!post) return res.status(404).json({ success: false });
    return res.status(200).json({ success: true, post });
  }

 if (req.method === 'PUT') {
  try {
    const { title, content } = req.body;
    const newSlug = slugify(title, { lower: true, strict: true });

    const updatedPost = await Post.findOneAndUpdate(
      { slug },
      { title, content, slug: newSlug },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    return res.status(200).json({ success: true, post: updatedPost });
  } catch (error) {
    console.error('UPDATE ERROR:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}


  if (req.method === 'DELETE') {
    await Post.findOneAndDelete({ slug });
    return res.status(200).json({ success: true });
  }

  res.status(405).json({ success: false });
}
