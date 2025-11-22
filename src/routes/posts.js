var express = require("express");
var router = express.Router();

var postsController = require("../controllers/postsController");

router.post("/uploadPost/:idUser", function (req, res) {
    postsController.uploadPost(req, res)
});

router.get("/lastPost/:idUser", function (req, res) {
    postsController.lastPost(req, res)
});

router.get("/fillSelect/:selectType/:selectTypeConnect", function (req, res) {
    postsController.fillSelect(req, res)
});

router.post("/upload/:table", function (req, res) {
    postsController.upload(req, res)
});

router.post("/connect/:table", function (req, res) {
    postsController.connect(req, res)
});

module.exports = router