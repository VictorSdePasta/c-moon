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
  nome varchar(50)
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
  fk_id_interacao int,
  fk_interacao_usuario int,
  fk_interacao_post int,
  primary key (id_interacao, usuario_id_usuario, post_id_post, fk_id_interacao, fk_interacao_usuario, fk_interacao_post),
  constraint fk_usuario_interacao foreign key (usuario_id_usuario) references usuario(id_usuario),
  constraint fk_post_interacao foreign key (post_id_post) references post(id_post),
  constraint fkinteracao_interacao foreign key (fk_id_interacao) references interacao(id_interacao),
  constraint fkinteracao_usuario foreign key (fk_interacao_usuario) references interacao(usuario_id_usuario),
  constraint fkinteracao_post foreign key (fk_interacao_post) references interacao(post_id_post)
);

create table subgeneros_terror(
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
  nome varchar(50)
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
  nome varchar(100)
);

create table local_narrativo_post (
  local_narrativo_id_local_narrativo int,
  post_id_post int,
  primary key (local_narrativo_id_local_narrativo, post_id_post),
  constraint fk_post_local_narrativo foreign key (local_narrativo_id_local_narrativo) references local_narrativo(id_local_narrativo),
  constraint fk_local_narrativo_post foreign key (post_id_post) references post(id_post)
);