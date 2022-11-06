const { Order } = require("../../models/models");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async function (req, res) {
  const query = {
    user: req.user.id,
  };

  if (req.query.start) {
    query.date = {
      [Op.gte]: req.query.start,
    };
  }

  if (req.query.end) {
    if (!query.date) query.date = {};
    query.date[[Op.lte]] = req.query.end;
  }

  if ((req, query.order)) {
    query.order = +req.query.order;
  }
  try {
    const orders = await Order.findAll({
      where: { query },
      order: [[sequelize.fn("max", sequelize.col("date")), "DESC"]],
      offset: +req.query.offset,
      limit: +req.query.limit,
    });

    res.status(200).json(orders);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.create = async function (req, res) {
  const { list } = req.body;
  try {
    const previousOrder = await Order.findOne({
      where: {
        id: req.user.id,
      },
      order: sequelize.fn("max", sequelize.col("date")),
    });

    const maxOrder = previousOrder ? previousOrder.order : 0;

    const order = await Order.create({
      list,
      user: req.user.id,
      order: maxOrder + 1,
    });
    res.status(201).json(order);
  } catch (error) {
    errorHandler(res, error);
  }
};
