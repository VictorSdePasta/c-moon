var express = require("express");
var router = express.Router();

var avisoController = require("../controllers/feedController");

router.get("/fill/:pais", function (req, res) {
    avisoController.fill(req, res);
});

module.exports = router;