var database = require("../database/config");

function fill(pais) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function fill()", pais);

  var instrucaoSql = `
          select u.nome as userName, p.titulo as title, historia as tale, s.titulo as postSubg, e.titulo as postAge, l.titulo as postLocation, c.titulo as postCountry, i.urlLink as postImage, i.titulo as postImageTitle from usuario u join post p on u.id_usuario = p.usuario_id_usuario left join subgenero_post sp on p.id_post = sp.post_id_post left join subgenero s on sp.subgenero_id_subgenero = s.id_subgenero left join epoca_post ep on ep.post_id_post = p.id_post left join epoca e on e.id_epoca = ep.epoca_id_epoca left join local_narrativo_post lp on lp.post_id_post = p.id_post left join local_narrativo l on l.id_local_narrativo = lp.local_narrativo_id_local_narrativo left join imagem_post ip on ip.post_id_post = p.id_post left join imagem i on i.id_imagem = ip.imagem_id_imagem left join pais_post pp on pp.post_id_post = p.id_post left join pais c on c.id_pais = pp.pais_id_pais where c.id_pais = '${pais}';
      `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  fill
}