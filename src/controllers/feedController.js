var feedModel = require("../models/feedModel");

function fill(req, res) {
  let idPais = req.params.pais

  if (idPais == undefined) {
    res.status(400).send(`O pais está indefinido!`)
  } else {
    feedModel.fill(idPais).then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!")
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
  }
}

module.exports = {
  fill
};