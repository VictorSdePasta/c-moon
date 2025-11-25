var dashModel = require("../models/dashModel");

function barDataCountry(req, res) {
  let idPais = req.params.pais

  if (idPais == undefined) {}
}

function barData(req, res) {
}

function pieDataCountry(req, res) {
  let idPais = req.params.pais

  if (idPais == undefined) {}
}

function pieData(req, res) {
}

module.exports = {
  barDataCountry,
  barData,
  pieDataCountry,
  pieData
};