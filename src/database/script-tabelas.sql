create database cmoon;

use cmoon;

create table usuario(
  id_usuario int auto_increment primary key,
  nome varchar(50),
  email varchar(100),
  dtNasc date,
  senha varchar(255),
  pais varchar(50),
  imagem_id_imagem int
);

create table imagem(
  id_imagem int primary key auto_increment,
  titulo varchar(100),
  urlLink varchar(255),
  post_id_post int
);

create table post(
  id_post int primary key auto_increment,
  titulo varchar(100),
  historia text,
  epocaHistoria varchar(50),
  dtPost date,
  localPost varchar(100),
  pais varchar(50),
  usuario_id_usuario int
);

create table subgenero(
  id_subgenero int primary key auto_increment,
  titulo varchar(50)
);

alter table usuario add constraint fk_imagem foreign key (imagem_id_imagem) references imagem(id_imagem);
alter table imagem add constraint fk_post foreign key (post_id_post) references post(id_post);
alter table post add constraint fk_usuario foreign key (usuario_id_usuario) references usuario(id_usuario);

create table interacao(
  usuario_id_usuario int,
  post_id_post int,
  curtiu tinyint,
  comentario text,
  dtInteracao date,
  interacao_usuario_id_usuario int,
  interacao_post_id_post int,
  primary key (usuario_id_usuario, post_id_post, interacao_usuario_id_usuario, interacao_post_id_post),
  constraint fk_usuario_interacao foreign key (usuario_id_usuario) references usuario(id_usuario),
  constraint fk_post_interacao foreign key (post_id_post) references post(id_post),
  constraint fk_interacao_usuario foreign key (interacao_usuario_id_usuario) references interacao(usuario_id_usuario),
  constraint fk_interacao_post foreign key (interacao_post_id_post) references interacao(post_id_post)
);

create table subgeneros_terror(
  subgenero_id_subgenero int,
  post_id_post int,
  principal tinyint,
  primary key (subgenero_id_subgenero, post_id_post),
  constraint fk_subgenero foreign key (subgenero_id_subgenero) references subgenero(id_subgenero),
  constraint fk_subgenero_post foreign key (post_id_post) references post(id_post)
);