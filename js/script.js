// Array met songinformatie
const songs = [
    {
        title: "Snelle Leven",
        artist: "Henkie T",
        src: "songs/song1.mp3",
        image: "img/song1.jpg"
    },
    {
        title: "Song Titel 2",
        artist: "Artiest 2",
        src: "songs/song2.mp3",
        image: "img/song2.jpg"
    },
    {
        title: "Song Titel 3",
        artist: "Artiest 3",
        src: "songs/song3.mp3",
        image: "img/song3.jpg"
    },
    {
        title: "Song Titel 4",
        artist: "Artiest 4",
        src: "songs/song4.mp3",
        image: "img/song4.jpg"
    }
];

let currentSongIndex = 0;
let isPlaying = false;
let isRepeating = false;

// Functie om een nummer te selecteren
function selectSong(index) {
    currentSongIndex = index;
    const song = songs[index];
    document.getElementById("audioPlayer").src = song.src;
    document.getElementById("audioPlayer").load();
    document.getElementById("currentArtistImage").src = song.image;
    document.getElementById("currentSongTitle").innerText = `${song.title} - ${song.artist}`;
    document.getElementById("musicPlayer").style.display = 'block';
    playSong();
}

// Functie om een nummer af te spelen
function playSong() {
    document.getElementById("audioPlayer").play();
    isPlaying = true;
    document.getElementById("playButton").innerHTML = "&#10074;&#10074;";
}

// Functie om een nummer te pauzeren
function togglePlay() {
    const audioPlayer = document.getElementById("audioPlayer");
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
        document.getElementById("playButton").innerHTML = "&#9658;";
    } else {
        audioPlayer.play();
        isPlaying = true;
        document.getElementById("playButton").innerHTML = "&#10074;&#10074;";
    }
}

// Functie voor het volgende nummer
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    selectSong(currentSongIndex);
}

// Functie voor het vorige nummer
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    selectSong(currentSongIndex);
}

// Functie om de herhaalstatus in te schakelen
function toggleRepeat() {
    isRepeating = !isRepeating;
    const repeatButton = document.querySelector(".repeat-button");
    const repeatIcon = repeatButton.querySelector("img");

    if (isRepeating) {
        repeatButton.style.backgroundColor = "#1e90ff"; // Blauw
        repeatIcon.style.transform = "rotate(180deg)"; // Draai het icoon
    } else {
        repeatButton.style.backgroundColor = "#1db954"; // Groen
        repeatIcon.style.transform = "rotate(0deg)"; // Reset naar origineel
    }
    // Voeg hier een overgang toe aan de herhaal knop
    repeatButton.style.transition = "background-color 0.3s, transform 0.3s";
}

// Luister naar het einde van het nummer
document.getElementById("audioPlayer").addEventListener("ended", function() {
    if (isRepeating) {
        this.currentTime = 0;
        this.play();
    } else {
        nextSong();
    }
});

// Initialisatie op songs.html
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname.endsWith("songs.html")) {
        const selectedSongIndex = localStorage.getItem("selectedSongIndex");
        if (selectedSongIndex !== null) {
            selectSong(parseInt(selectedSongIndex));
        }
    }
});

// Tijd formatteren
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Event listener voor het bijwerken van de voortgang en tijd
document.getElementById("audioPlayer").addEventListener("timeupdate", function() {
    const seekSlider = document.querySelector(".seek_slider");
    const currentTimeDisplay = document.querySelector(".current-time");
    const totalDurationDisplay = document.querySelector(".total-duration");

    // Update de seekSlider
    seekSlider.value = (this.currentTime / this.duration) * 100;

    // Update de huidige tijd en totale duur
    currentTimeDisplay.innerText = formatTime(this.currentTime);
    totalDurationDisplay.innerText = formatTime(this.duration);
});

// Functie voor het doorspoelen of terugspoelen
function seekSong() {
    const seekSlider = document.querySelector(".seek_slider");
    const audioPlayer = document.getElementById("audioPlayer");
    const newTime = audioPlayer.duration * (seekSlider.value / 100);
    audioPlayer.currentTime = newTime;
}

// Event listener voor de seek slider
document.querySelector(".seek_slider").addEventListener("input", seekSong);
