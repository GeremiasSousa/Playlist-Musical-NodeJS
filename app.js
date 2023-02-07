//Constantes e Instancias necessarias para a app
require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');


//Configurando a Engine/Middleware do projeto - Que é a EJS
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));//Adicionando a static||pasta principal onde é feito o Front
app.use(express.urlencoded({extended:true}));//Serve para receber os dados de um formulário HTML e enviar para API
app.use(express.json());//Serve para ler JSON


//Importando variável de conexão
const conexao = require('./db/db');
conexao();


//Importanto o modulo de rotas da aplicação
const routes = require('./model/Routes');
app.use(routes);



//Istartando o servidor
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

