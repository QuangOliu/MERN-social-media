const { json } = require("body-parser");
const Post = require("../models/Post");
const User = require("../models/User");

// CREATE POST
const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const { firstName, lastName } = user;

    const newPost = new Post({
      userId,
      firstName,
      lastName,
      location: "",
      description,
      picturePath,
      userPicturePath: user.userPicturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

// READ POSTS OF USER
const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId: userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};

// READ POSTS FOR FEED
const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort([["createdAt", 1]]);
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE LIKE
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatePost = await Post.findByIdAndUpdate(
      { _id: id },
      {
        likes: post.likes,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatePost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  likePost,
  getUserPosts,
  getFeedPosts,
};
