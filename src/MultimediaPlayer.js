var playingsong = false;
var repeatstatus = true;
class MultimediaPlayer extends DOMGui {

    constructor(audioTagSelector, tracks, guiParams = undefined) {
        super();

        this.audio = document.querySelector(audioTagSelector);
        this.tracks = tracks;
        this.audio.src = this.tracks[0];
        this.currentTrack = 0;
        this._DOMElements = {
            fondo: undefined,
            play: undefined,
            next: undefined,
            prev: undefined,
            repeat: undefined,
            title: undefined,
            artist: undefined,
            album: undefined,
            cover: undefined,
            currentTime: undefined,
            totalTime: undefined,
            progressBar: undefined,
            playlistMenu: undefined,
            time: undefined
        }
        this.setDOMElements(guiParams);
        this.addListeners();
        this.setPlayerInfo();
    }
  

    addListeners() {
        this.startTimeUpdateListener();
        this.addButtonListener('play',
            () => {
                if (this.audio.paused) {
                    this.audio.play();
                    this._DOMElements.play.classList.remove('loading');
                    playingsong = true;
                    //console.log("PLAY");

                } else {
                    this.audio.pause();
                    this._DOMElements.play.classList.add('loading');
                    // console.log("PAUSE");
                    playingsong = false;
                }
                this._DOMElements.play.classList.toggle('fa-play');
                this._DOMElements.play.classList.toggle('fa-pause');
            });

        this.addButtonListener('next',
            () => {
                this.changePlayingSong(this.currentTrack + 1);
            });

        this.addButtonListener('prev',
            () => {
                this.changePlayingSong(this.currentTrack - 1);
            });
        this.addButtonListener('repeat',
            () => {
                if (repeatstatus == true) {
                    this._DOMElements.repeat.style.opacity = "0.5";
                    repeatstatus = false;
                } else {
                    this._DOMElements.repeat.style.opacity = "1";
                    repeatstatus = true;
                }

            });

        this.addButtonListener('progressBar',
            (e) => {
                let position = e.offsetX;
                let totalW = e.target.clientWidth;
                let progress = position / totalW;
                this.updateProgressBar(progress);
                this.audio.currentTime = this.audio.duration * progress;
            });
    }

    addButtonListener(btnName, callback) {
        this._DOMElements[btnName].onclick = callback;
    }

    changePlayingSong(index) {
        console.log(index);
        
        if (index <= this.tracks.length - 1) {
            this.currentTrack = index;
            if (index == -1) {
                //console.log("va a la cancion en posicion: "+this.tracks.length);
                this.currentTrack = this.tracks.length - 1;
            }
        }
        else {
            this.currentTrack = 0;
        }
        if(index<5 || index==this.tracks.length){
            this._DOMElements.playlistMenu.scrollTo(0, 0);
  
        }else{
            this._DOMElements.playlistMenu.scrollTo(0, 400);
        }
        this.audio.src = this.tracks[this.currentTrack];
        this.verifystatus();
        let playing = this._DOMElements.playlistMenu.querySelector('.playing');
        playing.classList.remove('playing');
        let element = this._DOMElements.playlistMenu.children[this.currentTrack];
        element.classList.add('playing');
        this.setPlayerInfo();
    }
    verifystatus() {
        if (playingsong) {
            this.audio.play();
        } else {
            console.log("cambia y no suena");
        }


    }
    setPlayerInfo() {
        let element = this._DOMElements.playlistMenu.children[this.currentTrack];
        this._DOMElements.title.innerHTML = element.querySelector('.title').innerHTML;
        this._DOMElements.artist.innerHTML = element.querySelector('.artist').innerHTML;
        this._DOMElements.time.innerHTML=element.querySelector('.time').innerHTML; 
        let fondourl = element.querySelector('.background').innerHTML;
        this._DOMElements.fondo.style.backgroundImage= 'url(' + fondourl + ')';
        this._DOMElements.cover.style.backgroundImage = 'url(' + fondourl + ')';
       
    }

    startTimeUpdateListener() {
        this.audio.ontimeupdate = () => {
            let total = this.audio.duration;
            let current = this.audio.currentTime;
            let progress = current / total;
            let minutes = "0" + Math.floor(current / 60);
            let seconds = "0" + Math.floor(current - minutes * 60);
            let dur = minutes.substr(-2) + ":" + seconds.substr(-2);
            document.querySelector('.timecurrent').innerHTML = dur;

            
            this.updateProgressBar(progress);
            if (current == total) {
                this.updateProgressBar(0);
                if (repeatstatus == true) {
                    this.changePlayingSong(this.currentTrack + 1);
                } else {
                    this._DOMElements.play.classList.replace('fa-pause', 'fa-play')
                    playingsong = false;
                }
            }
        }
    }

    updateProgressBar(progress) {
        this._DOMElements.progressBar.querySelector('.fill').style.transform = `scaleX(${progress})`;
    }
}