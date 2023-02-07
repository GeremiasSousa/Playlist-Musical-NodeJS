//Importando a biblioteca Express com apenas o modulo de rotas
const routes = require('express').Router();
const { default: mongoose } = require('mongoose');
const Music = require('./Music');

//Rota principal da app
routes.get('/', async (req, res) => {
    const playlist = await Music.find();
    res.render('index', {  playlist  });
});


//Rota de view do formulário de cadastro
routes.get('/cadastro', async (req, res) => {
    const playlist = await Music.find();
    res.render('cadastro', { playlist, music: null, musicDelete: null });
});

//Rota de cadastro do formulário
routes.post('/cad', async (req, res) => {
    const music = {
        nome_music: req.body.nome,
        artist_music: req.body.nome_artista,
        link_image: req.body.link_image,
        link_music: req.body.link_musica,
    }

    try {
        await Music.create(music);
        res.send("<script>alert('Cadastrou a música!');location.href ='http://localhost:3000/cadastro'</script>");
    } catch (err) {
        console.log(err);
    }
});


//Rota de editar a música
routes.get('/getById/:id/:action', async (req, res) => {
    const playlist = await Music.find();
    const music = await Music.findById(req.params.id);

    if (req.params.action === 'edit') {
        res.render('cadastro', { playlist, music, musicDelete: null });
    }else if (req.params.action === 'delete'){
        res.render('cadastro', { playlist, music:null, musicDelete: music });
    }

    
});


//Rota de atualizar os novos dados da música
routes.post('/update/:id', async (req, res) => {
    const music = {
        nome_music: req.body.nome,
        artist_music: req.body.nome_artista,
        link_image: req.body.link_image,
        link_music: req.body.link_musica,
    }
    await Music.updateOne({ _id : req.params.id }, music);
    res.send("<script>alert('Música alterada com sucesso!');location.href ='http://localhost:3000/cadastro'</script>");
});


//Rota de deletar a música
routes.get('/delete/:id', async (req, res) => {
    await Music.deleteOne({ _id : req.params.id });
    res.send("<script>alert('Música deletada com sucesso!');location.href ='http://localhost:3000/cadastro'</script>");
});


module.exports = routes;