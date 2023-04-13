const { getFeedPosts, getUserPosts, likePost } = require("../controllers/postController.js");
const { verifyToken } = require("../middleware/authMiddleware.js");
var express = require("express");
const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

module.exports = router;
