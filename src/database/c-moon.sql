create database cmoon;

use cmoon;

create table usuario(
  id_usuario int auto_increment primary key,
  nome varchar(50),
  email varchar(100),
  dtNasc date,
  senha varchar(255),
  pais_id_pais int,
  imagem_id_imagem int
);

create table pais (
  id_pais int primary key auto_increment,
  titulo varchar(50)
);

create table imagem(
  id_imagem int primary key auto_increment,
  titulo varchar(100),
  urlLink varchar(255)
);

create table post(
  id_post int primary key auto_increment,
  titulo varchar(100),
  historia text,
  dtPost datetime default current_timestamp,
  usuario_id_usuario int
);

create table subgenero(
  id_subgenero int primary key auto_increment,
  titulo varchar(50)
);

alter table usuario add constraint fk_imagem foreign key (imagem_id_imagem) references imagem(id_imagem);
alter table usuario add constraint fk_pais foreign key (pais_id_pais) references pais(id_pais);
alter table post add constraint fk_usuario foreign key (usuario_id_usuario) references usuario(id_usuario);

create table interacao (
  id_interacao int auto_increment,
  usuario_id_usuario int,
  post_id_post int,
  curtiu tinyint,
  comentario text,
  dtInteracao date,
  primary key (id_interacao, usuario_id_usuario, post_id_post),
  constraint fk_usuario_interacao foreign key (usuario_id_usuario) references usuario(id_usuario),
  constraint fk_post_interacao foreign key (post_id_post) references post(id_post)
);

create table subgenero_post(
  subgenero_id_subgenero int,
  post_id_post int,
  principal tinyint,
  primary key (subgenero_id_subgenero, post_id_post),
  constraint fk_subgenero foreign key (subgenero_id_subgenero) references subgenero(id_subgenero),
  constraint fk_subgenero_post foreign key (post_id_post) references post(id_post)
);

create table pais_post (
  pais_id_pais int,
  post_id_post int,
  primary key (pais_id_pais, post_id_post),
  constraint fk_pais_post foreign key (pais_id_pais) references pais(id_pais),
  constraint fk_post_pais foreign key (post_id_post) references post(id_post)
);

create table imagem_post (
  imagem_id_imagem int,
  post_id_post int,
  primary key (imagem_id_imagem, post_id_post),
  constraint fk_imagem_post foreign key (imagem_id_imagem) references imagem(id_imagem),
  constraint fk_post_imagem foreign key (post_id_post) references post(id_post)
);

create table epoca (
  id_epoca int primary key auto_increment,
  titulo varchar(50)
);

create table epoca_post (
  epoca_id_epoca int,
  post_id_post int,
  primary key (epoca_id_epoca, post_id_post),
  constraint fk_post_epoca foreign key (epoca_id_epoca) references epoca(id_epoca),
  constraint fk_epoca_post foreign key (post_id_post) references post(id_post)
);

create table local_narrativo (
  id_local_narrativo int primary key auto_increment,
  titulo varchar(100)
);

create table local_narrativo_post (
  local_narrativo_id_local_narrativo int,
  post_id_post int,
  primary key (local_narrativo_id_local_narrativo, post_id_post),
  constraint fk_post_local_narrativo foreign key (local_narrativo_id_local_narrativo) references local_narrativo(id_local_narrativo),
  constraint fk_local_narrativo_post foreign key (post_id_post) references post(id_post)
);

select p.id_post as idPost, p.titulo as title, p.historia as tale, u.nome as userName, i.titulo as postImageTitle, i.urlLink as postImage, pa.titulo as postCountry, e.titulo as postAge, l.titulo as postLocation, ifnull(sum(it.curtiu), 0) as likes from post p left join usuario u on p.usuario_id_usuario = u.id_usuario left join imagem_post ip on ip.post_id_post = p.id_post left join imagem i on i.id_imagem = ip.imagem_id_imagem left join pais_post pp on pp.post_id_post = p.id_post left join pais pa on pa.id_pais = pp.pais_id_pais left join epoca_post ep on ep.post_id_post = p.id_post left join epoca e on e.id_epoca = ep.epoca_id_epoca left join local_narrativo_post lp on lp.post_id_post = p.id_post left join local_narrativo l on l.id_local_narrativo = lp.local_narrativo_id_local_narrativo left join interacao it on p.id_post = it.post_id_post group by u.nome, p.titulo, p.historia, e.titulo, l.titulo, pa.titulo, i.urlLink, i.titulo, p.id_post;

SELECT DISTINCT(post_id_post),comentario, `dtInteracao`, id_interacao, usuario_id_usuario FROM interacao WHERE usuario_id_usuario = 1 AND curtiu = 1;