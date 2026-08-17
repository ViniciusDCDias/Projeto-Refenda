create database refenda;
use refenda;

create table usuarios(
  id_user int primary key auto_increment,
  nome_user varchar(100) not null,
  email varchar(255) unique not null,
  senha varchar(255) not null,
  tipo_user enum("GESTOR","ALUNO","FUNCIONARIO") not null,
  ra varchar(15) unique
);
create table cardapios(
  id_ref int primary key auto_increment,
  nome_ref varchar(255) not null,
  descricao_ref text not null,
  atividade_ref boolean default true, #Se estiver em atividade é true se não é false
  data_ref date not null unique
);
create table agendamentos(
  data_agen timestamp not null default current_timestamp,
  atividade_agen boolean default true,
  id_user int,
  id_ref int,
  primary key(id_user,id_ref),
  constraint fk_agen_user
  foreign key (id_user) references usuarios(id_user),
  constraint fk_agen_ref
  foreign key (id_ref) references cardapios(id_ref)
);

create table consumo(
  id_con int primary key auto_increment,
  fabricados float not null,
  sobras float not null,
  id_ref int,
  constraint fk_ref_con
  foreign key (id_ref) references cardapios(id_ref)
)

drop database refenda;