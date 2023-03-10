const controls = document.querySelector('#controls');
const playButton = document.querySelector('#play-control');

let index = 0;
let currentMusic;
let isPlaying = false;
let i = 0;


controls.addEventListener('click', (event) => {
    const audios = [];
    let music = {};

    if (event.target.id != 'controls') {
        console.log(event);
        const musics = event.path[2].childNodes[5].childNodes[1].childNodes[3].childNodes;

        musics.forEach(element => {
            if (element.nodeName != '#text') {
                music.nome = element.childNodes[3].childNodes[0].data;
                music.artista = element.childNodes[5].childNodes[0].data;
                music.imagem = element.childNodes[1].childNodes[0].currentSrc;
                music.audio = element.childNodes[7].childNodes[1];
                audios.push(music);
                music = {};
            }
        }
        );
    }

    function updateDataMusic() {
        currentMusic = audios[index];
        document.querySelector('#currentName').innerText = currentMusic.nome;
        document.querySelector('#currentName1').style.display = 'block';
        document.querySelector('#currentName').innerHTML = `${currentMusic.nome} <br> <i>${currentMusic.artista}</i>`;
        document.querySelector('#currentArtist').innerText = currentMusic.artista;
        // document.querySelector('#currentArtist1').textContent = currentMusic.artista;
        document.querySelector('#currentImg').src = currentMusic.imagem;
        document.querySelector('#volume').value = currentMusic.audio.volume * 100;//Math.floor(currentMusic.audio.volume * 100);

        const progressbar = document.querySelector('#progressbar');
        const textCurrentDuration = document.querySelector('#current-duration');
        const textTotalDuration = document.querySelector('#total-duration');

        progressbar.max = Math.floor(currentMusic.audio.duration);
        textTotalDuration.innerText = secondsToMinutes(currentMusic.audio.duration);


        currentMusic.audio.ontimeupdate = () => {
            textCurrentDuration.innerText = secondsToMinutes(currentMusic.audio.currentTime);
            progressbar.valueAsNumber = currentMusic.audio.currentTime;
        }


    }





    if (event.target.id === 'play-control') {
        if (index === 0) {
            updateDataMusic();
        }
        if (!isPlaying) {
            playButton.classList.replace('bi-play-fill', 'bi-pause-fill');
            currentMusic.audio.play();
            isPlaying = true;
        } else {
            playButton.classList.replace('bi-pause-fill', 'bi-play-fill');
            currentMusic.audio.pause();
            isPlaying = false;
        }



    }

    if (event.target.id === 'vol-icon') {
        currentMusic.audio.muted = !currentMusic.audio.muted;
        if (currentMusic.audio.muted) {
            event.target.classList.replace('bi-volume-up-fill', 'bi-volume-mute-fill');
        } else {
            event.target.classList.replace('bi-volume-mute-fill', 'bi-volume-up-fill');
        }
        musicEnded();
    }

    if (event.target.id === 'volume') {
        currentMusic.audio.volume = event.target.valueAsNumber / 100;
        musicEnded();
    }

    if (event.target.id === 'progressbar') {
        currentMusic.audio.currentTime = event.target.valueAsNumber;
        musicEnded();
    }

    if (event.target.id === 'next-control') {
        index++;
        if (index === audios.length) {
            index = 0;
        }

        currentMusic.audio.pause();
        updateDataMusic();
        currentMusic.audio.play();
        playButton.classList.replace('bi-play-fill', 'bi-pause-fill');

        musicEnded();

    }


    if (event.target.id === 'prev-control') {
        console.log(index);
        index--;
        if (index < 0) {
            index = audios.length - 1;
        }

        currentMusic.audio.pause();
        updateDataMusic();
        currentMusic.audio.play();
        playButton.classList.replace('bi-play-fill', 'bi-pause-fill');

        musicEnded();

    }



    function musicEnded() {
        currentMusic.audio.addEventListener('ended', () => {
            index++;
            if (index === audios.length - 1) {
                index = 0;
            }
            currentMusic.audio.pause();
            updateDataMusic();
            currentMusic.audio.play();
            playButton.classList.replace('bi-play-fill', 'bi-pause-fill');
        });
    }
}

);


function secondsToMinutes(times) {
    const minutes = Math.floor(times / 60);
    const seconds = Math.floor(times % 60);
    return `${("0" + minutes).slice(-2)} : ${("0" + seconds).slice(-2)}`;
}