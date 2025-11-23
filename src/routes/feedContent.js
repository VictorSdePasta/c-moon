var express = require("express");
var router = express.Router();

var avisoController = require("../controllers/feedController");

router.get("/fill/:pais", function (req, res) {
    avisoController.fill(req, res);
});

router.get("/selPostSubgenres/:post", function (req, res) {
    avisoController.selPostSubgenres(req, res);
});

router.post("/like/:idPost/:idUser", function (req, res) {
    avisoController.like(req, res);
});

module.exports = router;