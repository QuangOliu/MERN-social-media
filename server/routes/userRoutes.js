var express = require("express");
var router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { getUser, getUserFriends, addRemoveFriend, getAllUser } = require("../controllers/userController");

// READ
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

// UPDATE
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

// Debuger
router.get("/", getAllUser);

module.exports = router;
