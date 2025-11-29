var feedModel = require("../models/feedModel");

function fill(req, res) {
  let idPais = req.params.pais

  if (idPais == undefined) {
    res.status(400).send("Seu idPais está undefined!");
  } else if (idPais == '0') {
    feedModel.fillAll().then(function (resultado) {
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

function selPostSubgenres(req, res) {
  let idPost = req.params.post

  feedModel.selPostSubgenres(idPost).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json({})
    }
  })
}

function like(req, res) {
  let idPost = req.params.idPost
  let idUser = req.params.idUser
  let like = req.body.like

  feedModel.like(idPost, idUser, like).then(function (resultado) {
    res.json(resultado);
  }).catch(
    function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o cadastro! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function updateLike(req, res) {
  let idPost = req.params.idPost
  let idUser = req.params.idUser
  let like = req.body.like

  feedModel.updateLike(idPost, idUser, like).then(function (resultado) {
    res.json(resultado)
  }).catch(
    function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o cadastro! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    })
}

function markLiked(req, res) {
  let idUser = req.params.idUser

  feedModel.markLiked(idUser).then(function (resultado) {
    res.json(resultado)
  }).catch(
    function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o cadastro! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
  fill,
  selPostSubgenres,
  like,
  updateLike,
  markLiked
};