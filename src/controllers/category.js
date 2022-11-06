const { Category, Position } = require("../../models/models");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async function (req, res) {
  try {
    const categories = await Category.findAll({ where: { id: req.user.id } });
    res.status(200).json(categories);
  } catch (error) {
    errorHandler(error);
  }
};
module.exports.getById = async function (req, res) {
  try {
    const category = await Category.findOne({ where: { id: req.params.id } });
    res.status(200).json(category);
  } catch (error) {
    errorHandler(error);
  }
};

module.exports.removeById = async function (req, res) {
  try {
    await Category.destroy({ where: { id: req.params.id } });
    await Position.destroy({ where: { id: req.params.id } });

    res.status(200).json({ message: "Category successfuly removed" });
  } catch (error) {
    errorHandler(error);
  }
};

module.exports.create = async function (req, res) {
  try {
    const category = await Category.create({
      name: req.body.name,
      user: req.user.id,
      imageSrc: req.file ? req.file.path : "",
    });

    res.status(200).json(category);
  } catch (error) {
    errorHandler(error);
  }
};

module.exports.update = async function (req, res) {
  try {
    const updated = {
      name: req.body.name,
    };
    if (req.file) {
      updated.imageSrc = req.file.path;
    }
    const category = await Category.update(updated, {
      where: { id: req.params.id },
    });
    res.status(200).json(category);
  } catch (error) {
    errorHandler(error);
  }
};
