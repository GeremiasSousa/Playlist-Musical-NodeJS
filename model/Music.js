//Importando o mongoose
const mongoose = require('mongoose');


//Configurando a base de dados com a constante que fará o armazenamento das musicas
const music_DBForm = new mongoose.Schema({
    nome_music: { type: String, required: true },
    artist_music: {type :String, required: true},
    link_image: {type :String, required: true},
    link_music: {type :String, required: true},
});

const Music = mongoose.model('Music',{
    nome_music:String,
    artist_music:String,
    link_image:String,
    link_music:String
});

//Exportando o modelo
module.exports = Music;