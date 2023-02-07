// Senha DB: 7UheKSLYJx6dEYEW

//Conectando o mongoose
const mongoose = require('mongoose');

//Fazendo conexao com o DB
const conexaoDB = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('Conectou ao DB'))
    .catch((err) => console.log("Não conectou ao DB com o erro " + err));
}

module.exports = conexaoDB;