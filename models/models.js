const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

const Category = sequelize.define("category", {
  name: { type: DataTypes.STRING, allowNull: false },
  imageSrc: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
  user: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
});

const Position = sequelize.define("position", {
  name: { type: DataTypes.STRING, allowNull: false },
  cost: { type: DataTypes.INTEGER, allowNull: false },
  user: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
  category: {
    type: DataTypes.INTEGER,
    references: { model: Category, key: "id" },
  },
});

const Order = sequelize.define("order", {
  date: { type: DataTypes.DATE, allowNull: false, defaultValue: Date.now },
  order: { type: DataTypes.INTEGER, allowNull: false },
  user: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
  list: [
    { name: DataTypes.STRING },
    { quantity: DataTypes.INTEGER },
    { cost: DataTypes.NUMBER },
  ],
});

// User.hasMany(Position);
// Position.belongsTo(User);

// User.hasMany(Category);
// Category.belongsTo(User);

// User.hasMany(Order);
// Order.belongsTo(User);

// Category.hasMany(Position);
// Position.belongsTo(Category);

module.exports = { User, Position, Category, Order };
