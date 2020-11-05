let tracks = []
let availableFormats =['Ogg','MP3','AAC','Wav']
let player = document.querySelector('#player');

let trackElements = document.getElementsByClassName('track');
for (let i = 0; i < trackElements.length; i++) {
    tracks.push(trackElements[i].getAttribute("href"));
}

let myAudioReader= new Drop();

var menu = document.querySelector('.menu');
menu.onclick = () => { player.classList.toggle('show') };

let myAudioPlayer = new MultimediaPlayer('#player audio', tracks, {
    play: document.querySelector('#playpause'),
    next: document.querySelector('#next'),
    prev: document.querySelector('#back'),
    time : document.querySelector('.totaltime'),
    repeat: document.querySelector('#repeat'),
    title: document.querySelector('#title'),
    artist: document.querySelector('#artist'),
    album: document.querySelector('#album'),
    cover: document.querySelector('#main'),
    playlistMenu: document.querySelector('#playlist'),
    progressBar: document.querySelector('#main .slider'),
    fondo: document.querySelector('#background')
});

console.log(myAudioPlayer);
