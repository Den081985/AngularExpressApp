const { Position } = require("../../models/models");
const errorHandler = require("../utils/errorHandler");

module.exports.getByCategoryId = async function (req, res) {
  try {
    const positions = await Position.findAll({
      where: {
        category: req.params.categoryId,
        user: req.user.id,
      },
    });
    res.status(200).json(positions);
  } catch (error) {
    errorHandler(error);
  }
};

module.exports.create = async function (req, res) {
  const { name, cost, category } = req.body;
  try {
    const position = await Position.create({
      name,
      cost,
      category,
      user: req.user.id,
    });
    res.status(200).json(position);
  } catch (error) {
    errorHandler(error);
  }
};

module.exports.remove = async function (req, res) {
  try {
    await Position.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Position deleted" });
  } catch (error) {
    errorHandler(error);
  }
};

module.exports.update = async function (req, res) {
  const { name, cost, category } = req.body;
  try {
    const position = await Position.update(
      {
        name,
        cost,
        category,
        user: req.user.id,
      },
      { where: { id: req.params.id } }
    );
    res.status(201).json(position);
  } catch (error) {
    errorHandler(error);
  }
};
