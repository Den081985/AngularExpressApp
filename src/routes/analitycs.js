const express = require("express");
const controller = require("../controllers/analitycs");

const router = express.Router();

router.get("/overview", controller.overview);

router.get("/analytics", controller.analitycs);

module.exports = router;
