import dbConnect from '../../../lib/dbconnect';
import Post from '../../../models/Post';
import slugify from 'slugify';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false });
  }
  const { title, content } = req.body;
  const slug = slugify(title, { lower: true, strict: true });
  const post = await Post.create({ title, content, slug });
  res.status(201).json({ success: true, data: post });
}
