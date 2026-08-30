create extension if not exists pgcrypto;

create table if not exists usuario (
	id uuid primary key unique default(gen_random_uuid()),
	nome varchar(100) not null,
	cpf varchar(11) not null unique,
	email varchar(100) not null unique,
	senha text not null,
	telefone varchar(25) not null,
	data_nascimento varchar(20),
	endereco varchar(50),
	data_cadastro timestamp default(now()),
	ativo bool default true,
	perfil varchar(20) default 'atendente',
	constraint chk_perfil check(perfil in ('admin', 'atendente', 'cliente'))
);
create table if not exists categoria (
	id uuid primary key unique default(gen_random_uuid()),
	nome varchar(50) unique not null,
	descricao varchar(255),
	ativo bool default true
);
create table if not exists livro (
	id uuid primary key unique default(gen_random_uuid()),
	isbn varchar(100) not null unique,
	titulo varchar(100) not null,
	ano_publicacao int not null,
	edicao varchar(50),
	editora varchar(50),
	categoria_id uuid not null,
	descricao varchar(255),
	ativo bool default true,
	constraint fk_categoria_livro foreign key (categoria_id) references categoria(id)
);
create table if not exists autor (
	id uuid primary key unique default(gen_random_uuid()),
	nome varchar(100) not null,
	nascionalidade varchar(50) not null,
	data_nascimento varchar(25),
	ativo bool default true
);
create table if not exists livro_autor (
	id uuid primary key unique default(gen_random_uuid()),
	livro_id uuid not null, 
	autor_id uuid not null, 
	ativo bool default true,
	constraint fk_livro_autor foreign key (livro_id) references livro(id),
	constraint fk_autor_livro foreign key (autor_id) references autor(id)
);
create table if not exists exemplar (
	id uuid primary key unique default(gen_random_uuid()),
	cod_identificacao varchar(100) not null unique,
	livro_id uuid not null,
	data_aquisicao varchar(25),
	estado_conservacao varchar(50),
	status varchar(50) default 'disponivel', 
	ativo bool default true,
	constraint fk_livro_exemplar foreign key (livro_id) references livro(id),
	constraint chk_status_exemplar 
	check(status in ('disponivel', 'emprestado', 'danificado', 'perdido', 'indisponivel'))
);
create table if not exists devolucao (
	id uuid primary key unique default(gen_random_uuid()),
	data_devolucao timestamp default(now()),
	exemplar_id uuid not null, 
	funcionario_id uuid, 
	situacao varchar(50),
	constraint fk_exemplar_devolucao foreign key (exemplar_id) references exemplar(id),
	constraint fk_funcionario_devolucao foreign key (funcionario_id) references usuario(id)
);
create table if not exists emprestimo (
	id uuid primary key unique default(gen_random_uuid()),
	usuario_id uuid not null, 
	funcionario_id uuid not null,
	data_emprestimo timestamp default(now()),
	data_devolucao_prev varchar(25) not null,
	data_devolucao varchar(25),
	estado_conservacao varchar(50),
	status varchar(50) default 'em aberto',
	constraint chk_status_emprestimo 
	check(status in ('em aberto', 'devolvido', 'em atraso'))
);
create table if not exists emprestimo_exemplar (
	id uuid primary key unique default(gen_random_uuid()),
	emprestimo_id uuid not null, --fk
	exemplar_id uuid not null, --fk
	constraint fk_emprestimo_exemplar foreign key (emprestimo_id) references emprestimo(id),
	constraint fk_exemplar_emprestimo foreign key (exemplar_id) references exemplar(id)
);