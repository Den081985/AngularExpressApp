require("dotenv").config();
const sequelize = require("./db");
const app = require("./src/app/app");
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () =>
      console.log(`Server has beeen started on port ${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
