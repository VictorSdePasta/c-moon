var express = require("express");
var router = express.Router();

var postsController = require("../controllers/postsController");

router.post("/uploadPost/:idUser", function (req, res) {
    postsController.uploadPost(req, res)
});

module.exports = router