// // pages/api/posts/create.js
// import dbConnect from './lib/dbConnect';
// import Post from './models/Post';
// import slugify from 'slugify';

// export default async function handler(req, res) {
//   await dbConnect();

//   if (req.method !== 'POST') {
//     return res.status(405).json({ success: false, message: 'Only POST allowed' });
//   }

//   try {
//     const { title, content } = req.body;

//     if (!title || !content) {
//       return res.status(400).json({ success: false, message: 'Title and content required' });
//     }

//     const slug = slugify(title, { lower: true, strict: true });

//     const newPost = await Post.create({ title, content, slug });

//     res.status(201).json({ success: true, data: newPost });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// }
