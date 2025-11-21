var postsModel = require("../models/postsModel");

function uploadPost(req, res) {
  let title = req.body.title
  let tale = req.body.tale
  let subgenre = req.body.subgenre
  let age = req.body.age
  let loc = req.body.loc
  let country = req.body.country
  let user = req.params.idUser

  if (title == undefined) {
    res.status(400).send("O título está indefinido!");
  } else if (tale == undefined) {
    res.status(400).send("O conto está indefinido!");
  } else if (subgenre == undefined) {
    res.status(400).send("O subgênero está indefinido!");
  } else if (age == undefined) {
    res.status(400).send("A época está indefinido!");
  } else if (loc == undefined) {
    res.status(400).send("A localização está indefinido!");
  } else if (country == undefined) {
    res.status(400).send("O país está indefinido!");
  } else {
    postsModel.uploadPost(title, tale, subgenre, age, loc, country, user)
      .then(function (resultado) {
        res.json(resultado)
      }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      })
  }
}

module.exports = {
  uploadPost
};