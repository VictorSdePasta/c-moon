var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

router.get("/barData/:pais", function (req, res) {
    dashController.barDataCountry(req, res);
});

router.get("/barData", function (req, res) {
    dashController.barData(req, res);
});

router.get("/pieData/:pais", function (req, res) {
    dashController.pieDataCountry(req, res);
});

router.get("/pieData", function (req, res) {
    dashController.pieData(req, res);
});

module.exports = router;