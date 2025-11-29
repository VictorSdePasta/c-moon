var database = require("../database/config");

function fill(pais) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function fill()", pais);

  var instrucaoSql = `
        select p.id_post as idPost, p.titulo as title, p.historia as tale, u.nome as userName, i.titulo as postImageTitle, i.urlLink as postImage, pa.titulo as postCountry, e.titulo as postAge, l.titulo as postLocation, ifnull(sum(it.curtiu), 0) as likes from post p left join usuario u on p.usuario_id_usuario = u.id_usuario left join imagem_post ip on ip.post_id_post = p.id_post left join imagem i on i.id_imagem = ip.imagem_id_imagem  left join pais_post pp on pp.post_id_post = p.id_post left join pais pa on pa.id_pais = pp.pais_id_pais left join epoca_post ep on ep.post_id_post = p.id_post left join epoca e on e.id_epoca = ep.epoca_id_epoca left join local_narrativo_post lp on lp.post_id_post = p.id_post left join local_narrativo l on l.id_local_narrativo = lp.local_narrativo_id_local_narrativo left join interacao it on p.id_post = it.post_id_post where pa.id_pais = '${pais}' group by u.nome, p.titulo, p.historia, e.titulo, l.titulo, pa.titulo, i.urlLink, i.titulo, p.id_post;
      `

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function fillAll() {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function fillAll()");

  var instrucaoSql = `
          select p.id_post as idPost, p.titulo as title, p.historia as tale, u.nome as userName, i.titulo as postImageTitle, i.urlLink as postImage, pa.titulo as postCountry, e.titulo as postAge, l.titulo as postLocation, ifnull(sum(it.curtiu), 0) as likes from post p left join usuario u on p.usuario_id_usuario = u.id_usuario left join imagem_post ip on ip.post_id_post = p.id_post left join imagem i on i.id_imagem = ip.imagem_id_imagem left join pais_post pp on pp.post_id_post = p.id_post left join pais pa on pa.id_pais = pp.pais_id_pais left join epoca_post ep on ep.post_id_post = p.id_post left join epoca e on e.id_epoca = ep.epoca_id_epoca left join local_narrativo_post lp on lp.post_id_post = p.id_post left join local_narrativo l on l.id_local_narrativo = lp.local_narrativo_id_local_narrativo left join interacao it on p.id_post = it.post_id_post group by u.nome, p.titulo, p.historia, e.titulo, l.titulo, pa.titulo, i.urlLink, i.titulo, p.id_post;
      `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function selPostSubgenres(idPost) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function selPostSubgenres()", idPost);

  var instrucaoSql = `
        select s.titulo as postSubg from subgenero_post sp join subgenero s on s.id_subgenero = sp.subgenero_id_subgenero where post_id_post = ${idPost};
      `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function like(idPost, idUser, like) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function like()", idPost, idUser, like);

  var instrucaoSql = `
        insert into interacao (post_id_post,usuario_id_usuario, curtiu) values ('${idPost}', '${idUser}', '${like}');
      `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function updateLike(idPost, idUser, like) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function updateLike()", idPost, idUser, like);

  var instrucaoSql = `
        insert into interacao (post_id_post,usuario_id_usuario, curtiu) values ('${idPost}', '${idUser}', '${like}');
      `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function markLiked(idUser) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function markLiked()", idUser);

  var instrucaoSql = `
        select p.id_post idPost from post p join interacao it on it.post_id_post = p.id_post join usuario u on u.id_usuario = it.usuario_id_usuario where it.curtiu = 1 and it.usuario_id_usuario = '${idUser}';
      `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  fill,
  fillAll,
  selPostSubgenres,
  like,
  updateLike,
  markLiked
}