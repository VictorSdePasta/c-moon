var postsModel = require("../models/postsModel");

function uploadPost(req, res) {
  let title = req.body.title
  let tale = req.body.tale
  let user = req.params.idUser

  if (title == undefined) {
    res.status(400).send("O título está indefinido!");
  } else if (tale == undefined) {
    res.status(400).send("O conto está indefinido!");
  } else if (user == undefined) {
    res.status(400).send("O usuario está indefinido!");
  } else {
    postsModel.uploadPost(title, tale, user)
      .then(function (resultado) {
        res.json(resultado)
      }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      })
  }
}

function lastPost(req, res) {
  let user = req.params.idUser

  postsModel.lastPost(user)
    .then(
      function (resultado) {
        if (resultado.length > 0) {
          res.json({
            id: resultado[0].id_post
          })
        } else {
          res.status(204).send("Nenhum resultado encontrado!");
        }
      })
    .catch(
      function (erro) {
        console.log(erro);
        console.log(
          "Houve um erro ao buscar os avisos: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
}

function upload(req, res) {
  let table = req.params.table
  let title = req.body.title

  if (title == undefined) {
    res.status(400).send(`O titulo identificador está indefinido`)
  } else if (table == undefined) {
    res.status(400).send("A tabela está indefinida!");
  } else {
    postsModel.upload(table, title)
      .then(function (resultado) {

        postsModel.selectUploaded(table, title)
          .then(function (result) {
            if (result.length > 0) {
              res.json({
                idResult: result[0].id
              })
            } else {
              res.status(200).json({ idResult: null })
            }
          })

      }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      })
  }
}

function connect(req, res) {
  let idTable = req.body.tableId
  let idPost = req.body.postId
  let connectTable = req.body.conTable
  let table = req.params.table

  if (table == undefined) {
    res.status(400).send("A tabela está indefinido!");
  } else if (idPost == undefined) {
    res.status(400).send("O conto está indefinido!");
  } else if (idTable == undefined) {
    res.status(400).send("O id da tabela está indefinido!");
  } else if (connectTable == undefined) {
    res.status(400).send("A tabela da conexão está indefinido!");
  } else {
    postsModel.connectPost(table, idPost, idTable, connectTable)
      .then(function (resultado) {
        res.json(resultado)
      }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      })
  }
}

function fillSelect(req, res) {
  let selType = req.params.selectType

  if (selType == undefined) {
    res.status(400).send("O tipo do select está indefinido!")
  } else {
    postsModel.fillSelect(selType).then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado)
      } else {
        res.status(204).json({})
      }
    }).catch(function (erro) {
      console.log(erro)
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    })
  }
}

module.exports = {
  uploadPost,
  lastPost,
  upload,
  connect,
  fillSelect
};