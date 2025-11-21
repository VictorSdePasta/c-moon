var database = require("../database/config");

function uploadPost(title, tale, subgenre, age, loc, country, user) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", title, tale, user);

  let instrucaoSql = `
    INSERT INTO post (titulo, historia, usuario_id_usuario) VALUES ('${title}', '${tale}', '${user}')
  `

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  uploadPost
}