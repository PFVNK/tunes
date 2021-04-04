let allSongs = [
  {
    "artist": "Elaquent",
    "title": "Nollieflip - Elaquent",
    "music": "media/Elaquent - Nollieflip.mp3",
    "artwork": "media/elaquent.jpg"
  },
  {
    "artist": "Radiohead",
    "title": "Idioteque - Radiohead",
    "music": "media/kida.mp3",
    "artwork": "media/kida.jpg"
  },
  {
    "artist": "DJ Rashad",
    "title": "Feelin - DJ Rashad",
    "music": "media/feelin.mp3",
    "artwork": "media/feelin.jpg"
  }
]

//check if index, if not then set to 0
if (sessionStorage.getItem('idx') === null) {
  sessionStorage.setItem('idx', 0)
}
var index = +sessionStorage.getItem('idx')

//set record and background images based on index
document.getElementsByClassName('record-image')[0].src = allSongs[index].artwork
document.getElementsByClassName('backImg')[0].src = allSongs[index].artwork

//set audio based on index 
var song = new Audio(allSongs[index].music)

//get time update for audio and plug into progress bar and track times
let progress = document.getElementsByClassName('progress-bar')[0]
this.song.addEventListener('timeupdate', (currentTime) => {
  console.log(currentTime.srcElement.currentTime)
  //set total track time
  let seconds = song.duration % 60
  let minutes = parseInt(song.duration / 60)
  if (seconds.toString().length === 1) {
    seconds = '0' + seconds
  }
  document.getElementsByClassName('total-time')[0].innerHTML = `${minutes}:${Math.floor(seconds)}`

  //set current track time
  let currentSec = parseInt(currentTime.srcElement.currentTime % 60);
  let currentMin = parseInt((currentTime.srcElement.currentTime / 60) % 60);
  console.log(currentSec.toString().length)
  if (currentSec.toString().length === 1) {
    currentSec = '0' + currentSec
  }
  if (currentMin.toString().length === 1) {
    currentMin = '0' + currentMin
  }
  document.getElementsByClassName('current-time')[0].innerHTML = `${currentMin}:${currentSec}`

  //set progress bar
  progress.value = currentTime.srcElement.currentTime / song.duration
}, false)


//toggle wether track is playing or paused
var isPlaying = false;
function togglePlay() {
  isPlaying ? song.pause() : song.play();
};

song.onplaying = function () {
  isPlaying = true;
};
song.onpause = function () {
  isPlaying = false;
};

//Toggle play and pause icons
function playpause() {
  let play = document.getElementsByClassName('play-icon')[0]
  let pause = document.getElementsByClassName('pause-icon')[0]
  let record = document.getElementsByClassName('record-image')[0]
  let track = document.getElementsByClassName('track-details')[0]
  let artist = document.getElementsByClassName('artist')[0]
  let songTitle = document.getElementsByClassName('song-title')[0]

  if (pause.style.display === "none") {
    pause.style.display = "unset";
    play.style.display = 'none'
    record.style.animation = "rotate 5s infinite linear";
    record.style.animationDelay = '.4s'
    record.style.maxHeight = '100%'
    record.style.maxWidth = '100%'
    track.style.animation = 'slideup .5s forwards'
    artist.innerHTML = allSongs[index].artist
    songTitle.innerHTML = allSongs[index].title
  } else {
    pause.style.display = "none";
    play.style.display = 'unset'
    // record.style.animationPlayState = 'paused'
    record.style.animation = "paused";
    record.style.maxHeight = '90%'
    record.style.maxWidth = '90%'
    track.style.animation = 'slidedown .2s forwards'
  }
}

//controls for next and previous track
function advanceTrack() {
  sessionStorage.setItem('idx', index + 1)
  window.location.reload()
}

function backTrack() {
  sessionStorage.setItem('idx', index - 1)
  window.location.reload()
}
