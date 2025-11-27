var database = require("../database/config");

function barData() {
  let instrucaoSql = `select pa.titulo pais, count(pp.pais_id_pais) countPosts from post p join pais_post pp on p.id_post = pp.post_id_post join pais pa on pp.pais_id_pais = pa.id_pais group by pp.pais_id_pais order by countPosts desc limit 5;`

  return database.executar(instrucaoSql)
}

function barDataCountry(idPais) {
  let instrucaoSql = `select ln.titulo regiao, count(lnp.local_narrativo_id_local_narrativo) countLocate from post p join pais_post pp on p.id_post = pp.post_id_post join pais pa on pp.pais_id_pais = pa.id_pais join local_narrativo_post lnp on lnp.post_id_post = p.id_post join local_narrativo ln on ln.id_local_narrativo = lnp.local_narrativo_id_local_narrativo where pa.id_pais = ${idPais} group by ln.titulo order by countLocate desc;`
  
  return database.executar(instrucaoSql)
}

function pieData() {
  let instrucaoSql = `select s.titulo subgenres, count(sp.subgenero_id_subgenero) countSubgenres from post p join subgenero_post sp on p.id_post = sp.post_id_post join subgenero s on s.id_subgenero = sp.subgenero_id_subgenero group by sp.subgenero_id_subgenero order by countSubgenres desc;`
  
  return database.executar(instrucaoSql)
}

function pieDataCountry(idPais) {
  let instrucaoSql = `select s.titulo subgenres, count(sp.subgenero_id_subgenero) countSubgenres from post p join subgenero_post sp on p.id_post = sp.post_id_post join subgenero s on s.id_subgenero = sp.subgenero_id_subgenero join pais_post pp on pp.post_id_post = p.id_post join pais pa on pa.id_pais = pp.pais_id_pais where pa.id_pais = ${idPais} group by sp.subgenero_id_subgenero order by countSubgenres desc;`
  
  return database.executar(instrucaoSql)
}
  
module.exports = {
  barDataCountry,
  barData,
  pieDataCountry,
  pieData
};