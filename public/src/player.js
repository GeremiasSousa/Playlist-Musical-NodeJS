const play_button = document.getElementById('play-control');
const volume_button = document.getElementById('volume');
const mute_button = document.getElementById('vol-icon');
const next_button = document.getElementById('next-control');
const prev_button = document.getElementById('prev-control');
const table_music = document.querySelectorAll('table .musics');
const audio = document.querySelector('audio');
let music = {};
let musics = [];
let index = 0;
let is_playing = false;

play_button.addEventListener('click', playControl);
next_button.addEventListener('click', nextMusic);
prev_button.addEventListener('click', prevMusic);
volume_button.addEventListener('click', changeVolume);
mute_button.addEventListener('click', muteVolume);
document.querySelector('#progressbar').addEventListener('click', (event) => { audio.currentTime = event.target.valueAsNumber; })
audio.addEventListener('timeupdate', (event) => {
    document.querySelector('#current-duration').textContent = secondsToMinutes(audio.currentTime);
    document.querySelector('#progressbar').valueAsNumber = audio.currentTime;
});
audio.addEventListener('loadeddata', (event) => {
    document.querySelector('#total-duration').innerText = secondsToMinutes(Math.floor(audio.duration));
    document.querySelector('#progressbar').max = audio.duration;
});



for (let i = 0; i < table_music.length; i++) {
    music.name = table_music[i].children[1].textContent;
    music.src = table_music[i].children[3].children[0].src;
    music.artist = table_music[i].children[2].textContent;
    music.img_src = table_music[i].children[0].children[0].src;
    musics.push(music);
    music = {};
}


function playControl() {
    if (!is_playing) {
        audio.play();
        updateDataMusic();
        play_button.classList.replace('bi-play-fill', 'bi-pause-fill');
        is_playing = true;
    } else {
        play_button.classList.replace('bi-pause-fill', 'bi-play-fill');
        is_playing = false;
        audio.pause();
        updateDataMusic();
    }
    musicEnded();
}






function nextMusic() {
    if (is_playing) {
        if (index === musics.length - 1) {
            index = 0
        } else {
            index++;
        }
        audio.setAttribute('src', musics[index].src);
        audio.pause();
        updateDataMusic();
        audio.play();
    }
    musicEnded();
}

function prevMusic() {
    if (is_playing) {
        index--;
        if (index == -1) {
            index = musics.length - 1;
        }
        audio.setAttribute('src', musics[index].src);
        audio.pause();
        updateDataMusic();
        audio.play();
    }
    musicEnded();
}

function updateDataMusic() {
    const current_music = musics[index];
    document.querySelector('#currentImg').src = current_music.img_src;
    document.querySelector('#currentName').innerHTML = current_music.name;
    document.querySelector('#currentArtist').innerHTML = current_music.artist;
    document.querySelector('#volume').value = audio.volume * 100;
}

function changeVolume(event) {
    audio.volume = event.target.valueAsNumber / 100;
}

function muteVolume(event) {
    audio.muted = !audio.muted;
    if (audio.muted) {
        event.target.classList.replace('bi-volume-up-fill', 'bi-volume-mute-fill');
    } else {
        event.target.classList.replace('bi-volume-mute-fill', 'bi-volume-up-fill');
    }
}

function secondsToMinutes(times) {
    const minutes = Math.floor(times / 60);
    const seconds = Math.floor(times % 60);
    return `${("0" + minutes).slice(-2)} : ${("0" + seconds).slice(-2)}`;
}


function musicEnded() {
    if (is_playing) {
    audio.addEventListener('ended', () => {
        index++;
        if (index === musics.length - 1) {
            index = 0;
        }
        audio.pause();
        updateDataMusic();
        audio.setAttribute('src', musics[index].src);
        audio.play();
        play_button.classList.replace('bi-play-fill', 'bi-pause-fill');
    });
    }

}