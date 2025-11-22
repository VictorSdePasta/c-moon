var database = require("../database/config");

function uploadPost(title, tale, user) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", title, tale, user);

  let instrucaoSql = `
    INSERT INTO post (titulo, historia, usuario_id_usuario) VALUES ('${title}', '${tale}', '${user}')
  `

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function lastPost(user) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function lastPost()");
  var instrucaoSql = `
        SELECT 
          id_post
        FROM post p
            INNER JOIN usuario u
                ON p.usuario_id_usuario = u.id_usuario
        WHERE u.id_usuario = ${user} ORDER BY id_post DESC LIMIT 1;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function upload(table, title) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function upload(): ", title, table);

  let instrucaoSql = `
    INSERT INTO ${table} (titulo) VALUES ('${title}')
  `

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function selectUploaded(table, title) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function selectUploaded(): ", title, table);


  let instrucaoSql = `
    SELECT id_${table} as 'id' FROM ${table} WHERE titulo = '${title}';
  `

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function connectPost(table, idPost, idTable, conTable) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function connectPost(): ", table, idPost, idTable, conTable);

  let instrucaoSql = `
    INSERT INTO ${table} (post_id_post, ${conTable}_id_${conTable}) VALUES ('${idPost}', '${idTable}');
  `

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function fillSelect(selectType, selTypeCon) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function selectType(): ", selectType, selTypeCon);


  let instrucaoSql = `
    select id_${selectType} as 'id', titulo as 'title' from ${selectType} join ${selTypeCon} on ${selectType}_id_${selectType} = id_${selectType};
  `

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  uploadPost,
  lastPost,
  upload,
  selectUploaded,
  connectPost,
  fillSelect
}