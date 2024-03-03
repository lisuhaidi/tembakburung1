// inisiasi audio
let audioBurung = new Audio('./../audio/birdAudio.mp3');
let audioBomb = new Audio('./../audio/bombAudio.mp3');

// inisiasi nav
document.getElementById("namePlayer").innerHTML = localStorage.getItem("namePlayer");

// membuat fungsi hitung mundur
function hitungMundur() {
    var hitungInterval = setInterval(function() {
        detik--;

        if (detik >= 0) {
            var audioInterval = setInterval(
                function () {
                    audioBurung.play();
                }, 2000);
            document.getElementById("totalWaktu").innerHTML = detik ;
        } else {
            clearInterval(hitungInterval);
            clearInterval(audioInterval);
            document.querySelector('#end').style.display = 'block';
            bird.style.display = 'none'
            document.getElementById("endScore").innerHTML = counter;
            document.getElementById('inputScoreHigherScore').value = counter
            
            audioBurung.pause();
            const highScore = document.getElementById('highScore').innerHTML.trim()
            // atur akhir game
            containerPlayer.style.display = "flex";
            if (counter > highScore*1) {
                document.getElementById("congrats").innerHTML = "Skormu paling tinggi";
            } else {
                document.getElementById("congrats").innerHTML = "Skormu adalah:" + counter;   
            }
        }
    }, 1000); // 1000 milidetik = 1 detik
}


// tampilkan burung secra random
const main = document.querySelector("main");
const bird = document.getElementById("bird");
// inisiasi gambar burung
const burung = ["bird0.png", "bird1.png", "bird2.png", "bird3.png", "bird4.png"];
var burungRandom = Math.floor(Math.random() * burung.length)

// fungsi tampilkan gambar
function tampilkanGambar() {
    var burungRandom = Math.floor(Math.random() * burung.length)
    // awal permainan
    document.querySelector('main').style.cursor = "crosshair";
    // tentukan kordinat
    var top = Math.random() * main.offsetHeight;
    var left = Math.random() * main.offsetWidth;

    // buat gambar
    bird.src = `./../img/${burung[burungRandom]}`;
    bird.style.top = top + "px";
    bird.style.left = left + "px";
    bird.style.position = "relative"
}

let isHandlingClick = false; // variabel penanda
// gambar ketika diklik
bird.onclick = function clickSetter () {
    if (!isHandlingClick) { // jika tidak sedang menangani klik
        isHandlingClick = true; // set isHandlingClick menjadi true untuk menandai penanganan klik sedang berlangsung
        // ganti gambar
        audioBomb.play();
        bird.src = "./../img/boom.png"
        // ulangi kembali, kemudian batasi hanya 5 kali.
        if (detik > 0) {
            setTimeout(function () {
        isHandlingClick = false; // set isHandlingClick menjadi false setelah penanganan klik selesai
    }, 1500);
            setTimeout(tampilkanGambar, 1200);
            counter += 5;
            document.getElementById("score").innerHTML = counter;
            
        }
    }
}




// fungsi untuk play ulang
function play() {
document.getElementById("startModal").style.display = "none"
document.getElementById("score").innerHTML = 0
counter = 0
detik = 30;
hitungMundur();
tampilkanGambar();
if (document.querySelector('#end').style.display = 'block') {
    document.querySelector('#end').style.display = 'none';
}
if (bird.style.display = 'none') {
    bird.style.display = 'block'
}

// atur form tambah score
document.getElementById('highScorePlayer').innerHTML = localStorage.getItem("namePlayer");
document.getElementById('inputNameHigherScore').value = localStorage.getItem("namePlayer");
}




// putar back sound
const backsound = document.getElementById("music");
const toggleAudio = document.getElementById("toggleAudio");
var isPlaying = false;
var iconAudio = document.getElementById("iconAudio");
//    atur backsound
function toggleMusic() {
if (isPlaying) {
    // Hentikan musik
    backsound.pause();
    // Atur teks ikon menjadi "music_note"
    iconAudio.textContent = 'music_note' // Ubah teks tombol
} else {
    // Putar musik
    backsound.play();
    iconAudio.textContent = 'music_off'
}
isPlaying = !isPlaying; // Toggle status pemutaran musik
}


