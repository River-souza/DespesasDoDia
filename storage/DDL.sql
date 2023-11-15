create database dindin;

/*use dindin;*/

create table usuarios (
    id serial primary key not null,
    nome text not null,
    email text unique not null,
    senha text not null
  );

create table categorias (
    id serial primary key not null, 
	  descricao text not null
  );

create table transacoes (
    id serial primary key not null,
    descricao text not null,
    valor integer default 0,
	 /*data timestamp default now(),*/
    data text not null,
    categoria_id integer references categorias (id),
    usuario_id integer references usuarios (id),
    tipo text not null
  );

