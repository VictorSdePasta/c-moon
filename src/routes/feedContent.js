var express = require("express");
var router = express.Router();

var feedController = require("../controllers/feedController");

router.get("/fill/:pais", function (req, res) {
    feedController.fill(req, res);
});

router.get("/selPostSubgenres/:post", function (req, res) {
    feedController.selPostSubgenres(req, res);
});

router.post("/like/:idPost/:idUser", function (req, res) {
    feedController.like(req, res);
});

router.get("/markLiked/:idUser", function (req, res) {
    feedController.markLiked(req, res);
});

router.put("/updateLike/:idPost/:idUser", function (req, res) {
    feedController.updateLike(req, res);
});

module.exports = router;