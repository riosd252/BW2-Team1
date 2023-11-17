const params = new URLSearchParams(window.location.search);
const albumId = params.get("id");

const url = "https://deezerdevs-deezer.p.rapidapi.com/album/" + albumId;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "6788386030msha48a368adad879cp1b187ajsn6a3f06babbb5",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

function convertiDurata(secondi) {
  const minuti = Math.floor(secondi / 60);
  const restantiSec = secondi % 60;
  const durataFormattata = `${minuti}:${
    restantiSec < 10 ? "0" : ""
  }${restantiSec}`;
  return durataFormattata;
}

document.addEventListener("DOMContentLoaded", () => {
  const albumImg = document.getElementById("album-img");
  const mArtistImg = document.getElementById("m-as-artist-img");
  const mArtist = document.getElementById("m-artist");
  const mAlbumYear = document.getElementById("m-album-year");
  const mTracks = document.getElementById("m-tracks");
  const mAlbumDuration = document.getElementById("m-album-duration");
  const albumTitle = document.getElementById("album-title");
  const dArtistImg = document.getElementById("d-as-artist-img");
  const dArtist = document.getElementById("d-artist");
  const dAlbumYear = document.getElementById("d-album-year");
  const dTracks = document.getElementById("d-tracks");
  const dAlbumDuration = document.getElementById("d-album-duration");
  const tableBody = document.getElementById("table-body");

  fetch(url, options)
    .then((resp) => resp.json())
    .then((albumObj) => {
      const releaseDate = new Date(albumObj.release_date);
      const albumLength = convertiDurata(albumObj.duration);

      albumImg.setAttribute("src", albumObj.cover_medium);
      mArtistImg.setAttribute("src", albumObj.artist.picture_small);
      dArtistImg.setAttribute("src", albumObj.artist.picture_small);
      mArtist.innerText = albumObj.artist.name;
      mArtist.style.cursor = "pointer";
      dArtist.innerText = albumObj.artist.name;
      dArtist.style.cursor = "pointer";
      mAlbumYear.innerText = releaseDate.getFullYear();
      dAlbumYear.innerText = releaseDate.getFullYear();
      mTracks.innerText = albumObj.nb_tracks;
      dTracks.innerText = albumObj.nb_tracks;
      mAlbumDuration.innerText = albumLength;
      dAlbumDuration.innerText = albumLength;
      albumTitle.innerText = albumObj.title;

      const tracksArr = albumObj.tracks.data;
      let trackNum = 1;

      tracksArr.forEach((track) => {
        const trackLength = convertiDurata(track.duration);

        const trow = document.createElement("tr");
        const tdTrackNum = document.createElement("td");
        tdTrackNum.className = "fs-tbody fade-opacity ps-3 w-3";
        const tdTitleArtist = document.createElement("td");
        tdTitleArtist.className = "fs-tbody w-55";
        const titleArtistDiv = document.createElement("div");
        titleArtistDiv.onclick = (e) => {
          const playerImg = document.getElementById("player-bar-img");
          playerImg.setAttribute("src", track.album.cover_small);
          playerImg.classList.remove("d-none");
          const playerTitle = document.getElementById("player-bar-title");
          playerTitle.innerText = track.title;
          playerTitle.classList.remove("d-none");
          const playerArtist = document.getElementById("player-bar-artist");
          playerArtist.innerText = track.artist.name;
          playerArtist.classList.remove("d-none");
        };
        const titleP = document.createElement("p");
        titleP.className = "my-0 fw-bold";
        titleP.style.cursor = "pointer";
        const artistP = document.createElement("p");
        artistP.className = "my-0 fade-opacity";
        const tdTrackFans = document.createElement("td");
        tdTrackFans.className = "fs-tbody fade-opacity w-30";
        const tdTrackLength = document.createElement("td");
        tdTrackLength.className = "fs-tbody fade-opacity w-5";

        tdTrackNum.innerText = trackNum;
        titleP.innerText = track.title;
        artistP.innerText = track.artist.name;
        tdTrackFans.innerText = track.rank;
        tdTrackLength.innerText = trackLength;

        titleArtistDiv.appendChild(titleP);
        titleArtistDiv.appendChild(artistP);
        tdTitleArtist.appendChild(titleArtistDiv);
        trow.appendChild(tdTrackNum);
        trow.appendChild(tdTitleArtist);
        trow.appendChild(tdTrackFans);
        trow.appendChild(tdTrackLength);
        tableBody.appendChild(trow);

        trackNum++;
      });
    });
});

const nomiCanzoniGlobali = [
  "Bohemian Rhapsody - Queen",
  "La Camisa Negra - Juanes",
  "Gangnam Style - Psy",
  "Hips Don't Lie - Shakira",
  "Con Te Partirò -  Bocelli",
  "Despacito - Luis Fonsi",
  "Waka Waka  - Shakira",
  "Macarena - Los Del Rio",
  "Bamboleo - Gipsy Kings",
  "Volare - Domenico Modugno",
  "La Bamba - Ritchie Valens",
  "Felicità - Al Bano & Romina",
  "Wind of Change - Scorpions",
  "Dancing Queen - ABBA",
  "Let It Be - The Beatles",
  "Imagine - John Lennon",
  "One Love - Bob Marley",
  "Hotel California - Eagles",
  "Shape of You - Ed Sheeran",
  "Smooth - Santana",
  "Africa - Toto",
  "Bésame Mucho - Velázquez",
  "Bailando - Enrique Iglesias",
  "Ai Se Eu Te Pego -  Teló",
  "Karma Chameleon -  Club",
  "Rock the Casbah - The Clash",
  "Wonderwall - Oasis",
  "Sweet Child o' Mine -  Roses",
  "Rolling in the Deep - Adele",
  "Livin' la Vida Loca -  Martin",
  "Eye of the Tiger - Survivor",
  "I Will Survive - Gloria Gaynor",
  "Stayin' Alive - Bee Gees",
  "Take On Me - a-ha",
  "Poker Face - Lady Gaga",
  "Heroes - David Bowie",
  "Sultans of Swing - Dire Straits",
  "Stairway to Heaven - Zeppelin",
  "Sweet Dreams - Eurythmics",
  "Billie Jean - Michael Jackson",
  "Can't Help Falling in Love - Elvis",
  "My Heart Will Go On - Celine Dion",
  "Zombie - The Cranberries",
  "Nessun Dorma - Luciano Pavarotti",
  "Vogue - Madonna",
  "Thriller - Michael Jackson",
  "Like a Rolling Stone - Bob Dylan",
  "Born in the U.S.A. - Bruce",
  "Creep - Radiohead",
  "Hey Jude - The Beatles",
];

function popolaSideScroll() {
  const sideScroll = document.getElementById("side-scroll");
  sideScroll.innerHTML = "";

  nomiCanzoniGlobali.forEach((nomeCanzone) => {
    let li = document.createElement("li");
    li.style.listStyle = "none";
    let a = document.createElement("a");
    a.className = "nav-link";
    a.href = "#";
    a.textContent = nomeCanzone;
    li.appendChild(a);
    sideScroll.appendChild(li);
  });
}

popolaSideScroll();

function creaControlliPlayer() {
  const container = document.querySelector(
    ".col-4.d-flex.justify-content-center.align-items-center"
  );

  const volumeContainer = document.getElementById("volume-container");

  const controlliDiv = document.createElement("div");
  controlliDiv.id = "controlli-player";
  const volumeDiv = document.createElement("div");
  const prevBtn = document.createElement("button");
  prevBtn.id = "prev-track-btn";
  prevBtn.className = "fs-3";
  prevBtn.innerHTML = `<i class="bi bi-chevron-double-left"></i>`;
  controlliDiv.appendChild(prevBtn);

  const playPauseBtn = document.createElement("button");
  playPauseBtn.id = "play-pause-btn";
  playPauseBtn.className = "fs-3";
  playPauseBtn.innerHTML = `<i class="bi bi-play-fill"></i>`;
  controlliDiv.appendChild(playPauseBtn);

  const nextBtn = document.createElement("button");
  nextBtn.id = "next-track-btn";
  nextBtn.className = "fs-3";
  nextBtn.innerHTML = `<i class="bi bi-chevron-double-right"></i>`;
  controlliDiv.appendChild(nextBtn);

  const volumeIcon = document.createElement("p");
  volumeIcon.innerHTML = `<i class="bi bi-volume-up"></i>`;
  volumeIcon.className = "fs-3 mb-0 me-2 d-inline-block align-middle";
  const volumeControl = document.createElement("input");
  volumeControl.className = "align-middle";
  volumeControl.type = "range";
  volumeControl.id = "volume-control";
  volumeControl.min = "0";
  volumeControl.max = "1";
  volumeControl.step = "0.01";
  volumeControl.value = "0.5";
  volumeDiv.appendChild(volumeIcon);
  volumeDiv.appendChild(volumeControl);

  container.appendChild(controlliDiv);
  volumeContainer.appendChild(volumeDiv);
}

creaControlliPlayer();
