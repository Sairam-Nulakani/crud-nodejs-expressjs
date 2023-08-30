const fs = require("fs");

const users = JSON.parse(fs.readFileSync("./dev-data/data/users.json"));

exports.getAllUsers = async (req, res) => {
  try {
    return res.status(200).json({
      message: "success",
      requestedAt: req.requestedTime,
      length: users.length,
      users: users,
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.createUser = async (req, res) => {
  try {
  } catch (err) {
    return res.status(401).send(err);
  }
};
exports.getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = users.find((el) => el._id === id);
    // if (!user) {
    //   res.status(400).send("User not found");
    // }
    res.status(200).json({ message: "success", user: { user } });
  } catch (err) {
    return res.status(401).send(err);
  }
};
exports.updateUser = async (req, res) => {
  try {
  } catch (err) {
    return res.status(401).send(err);
  }
};
exports.deleteUser = async (req, res) => {
  try {
  } catch (err) {
    return res.status(401).send(err);
  }
};
