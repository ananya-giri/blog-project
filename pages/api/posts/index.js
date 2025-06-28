// pages/api/posts/index.js
import dbConnect from '../../../lib/dbconnect';
import Post from '../../../models/Post';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const posts = await Post.find({});
    return res.status(200).json({ success: true, posts });
  }

  res.status(405).json({ success: false, message: 'Method not allowed' });
}
