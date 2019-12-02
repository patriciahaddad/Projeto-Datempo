INSERT INTO tipousuario (Titulo) VALUES ('Administrador'),('Fornecedor'),('Consumidor');

INSERT INTO categoria (NomeCategoria) VALUES ('Bebidas'), ('Higiene'), ('Matinais');

INSERT INTO produto (NomeProduto, IdCategoria) VALUES ('Refrigerante',1), ('Sabonete',2), ('Leite',3);

INSERT INTO usuario (Nome, Email, Senha, Identificador, IdTipoUsuario) VALUES ('Cleiton Silva', 'cleiton@hotmail.com', 'cleiton123', '42321232132', 3)
INSERT INTO usuario (Nome, Email, Senha, Identificador, IdTipoUsuario) VALUES ('Admin', 'admin@admin.com', 'admin', '42321232132', 1)
INSERT INTO usuario (Nome, Email, Senha, Identificador, IdTipoUsuario) VALUES ('Miro Mario', 'cea@gmail.com', 'fruta', '42321232132213', 2)

INSERT INTO endereco(CEP, Numero, Complemento, IdUsuario) VALUES ('07910250', '33', '', 1)
INSERT INTO endereco(CEP, Numero, Complemento, IdUsuario) VALUES ('07910210', '2', '', 2)
INSERT INTO endereco(CEP, Numero, Complemento, IdUsuario) VALUES ('08223000', '1288', '', 3)

INSERT INTO oferta(NomeOferta, Marca, QuantVenda, Validade, Preco,Imagem, Descricao, IdUsuario, IdProduto) VALUES ('Refrigerante Dolly', 'Dolly', 1,'2019-08-17T18:00:00', 7.30, 'Imagem dolly', 'Doce', 2, 1)
INSERT INTO oferta(NomeOferta, Marca, QuantVenda, Validade, Preco,Imagem, Descricao, IdUsuario, IdProduto) VALUES ('Sabonete dove', 'dove', 3,'2019-08-17T18:00:00', 5.60, 'Imagem dove', 'Macio', 2, 2)
INSERT INTO oferta(NomeOferta, Marca, QuantVenda, Validade, Preco,Imagem, Descricao, IdUsuario, IdProduto) VALUES ('Leite Lacta', 'lacta', 2,'2019-08-17T18:00:00', 5.60, 'Imagem leite', '    Leite desnatado', 2, 2)


INSERT INTO reserva(QuantCompra, DataReserva, PIN, IdOferta, IdUsuario) VALUES (3, '2019-08-07T18:00:00', 333, 1,1)