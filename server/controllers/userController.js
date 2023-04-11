const User = require("../models/User");

//READ USER
const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (!user) return res.status(404).json({ message: "User not found!!!" });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//READ FRIENDS OF USER
const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });

    const friends = await Promise.all(user.friends.map((id) => User.findOne({ _id: id })));

    const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
      return { _id, firstName, lastName, occupation, location, picturePath };
    });

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE
const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findOne({ _id: id });
    const friend = await User.findOne({ _id: friendId });

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(user.friends.map((id) => User.findById(id)));
    const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
      return { _id, firstName, lastName, occupation, location, picturePath };
    });

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET ALL USER
const getAllUser = async (req, res) => {
  try {
    const user = await User.find({});
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getAllUser,
};
