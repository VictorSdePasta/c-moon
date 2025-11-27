var dashModel = require("../models/dashModel");

function barDataCountry(req, res) {
  let idPais = req.params.pais
  console.log(`Recuperando os ultimos dados do pais de id ${idPais}`)

  dashModel.barDataCountry(idPais).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado)
    } else {
      res.status(204).send(`Nenhum resultado encontrado!`)
    }
  }).catch(function (erro) {
    console.log(erro)
    console.log("Houve um erro ao buscar os últimos dados do pais.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  })
}

function barData(req, res) {
  dashModel.barData().then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os últimos dados.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function pieDataCountry(req, res) {
  let idPais = req.params.pais
  console.log(`Recuperando os ultimos dados do pais de id ${idPais}`)

  dashModel.pieDataCountry(idPais).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado)
    } else {
      res.status(204).send(`Nenhum resultado encontrado!`)
    }
  }).catch(function (erro) {
    console.log(erro)
    console.log("Houve um erro ao buscar os últimos dados do pais.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  })
}

function pieData(req, res) {
  dashModel.pieData().then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os últimos dados.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  barDataCountry,
  barData,
  pieDataCountry,
  pieData
};