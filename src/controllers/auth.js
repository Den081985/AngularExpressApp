const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/models");
const errorHandler = require("../utils/errorHandler");

function jwtSign(id, email) {
  return jwt.sign({ userId: id, userEmail: email }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
}

module.exports.login = async function (req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const comparedPassword = bcrypt.compareSync(password, user.password);

    if (!comparedPassword) {
      res.status(401).json({ message: "Password is uncorrect" });
    }

    const token = jwtSign(user.id, user.email);

    res.status(200).json({ token: `Bearer ${token}` });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.register = async function (req, res) {
  const { email, password } = req.body;
  try {
    const candidate = await User.findOne({ where: { email: email } });

    if (candidate) {
      res.status(409).json({ message: "Email is already used" });
    }
    const hashedPassword = await bcrypt.hash(password, 5);

    const user = User.create({ email, password: hashedPassword });

    const token = jwtSign(user.id, user.email);

    res.status(201).json({ token: `Bearer ${token}` });
  } catch (error) {
    errorHandler(res, error);
  }
};
