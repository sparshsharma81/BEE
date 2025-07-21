const User = require("../models/user.model");
const { config } = require("dotenv");
const createUser = async (req, res) => {
  try {
    const { name,email,age } = req.body;
    const user = await User.create({
      email,
      name,
      age
    });
    await user.save(); // Save the user to the database
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, age } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { email, name, age },
      { new: true }
    );
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser
};