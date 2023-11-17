const params = new URLSearchParams(window.location.search);
const artistId = params.get("id");

const url =
  "https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistId;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "6788386030msha48a368adad879cp1b187ajsn6a3f06babbb5",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

const mainContent = document.querySelector(".MainContent");
const MainContentArtist = document.getElementById("MainContentArtist");
const image = document.getElementById("immagineCanvas");
const trackDiv = document.getElementById("tracksX5");

function displayPlayList(items) {
  items.forEach((item) => {
    const itemText = document.createElement("p");
    itemText.textContent = item;
  });
}
function goHome() {
  window.location = "home.html";
}
function goBack() {
  window.history.back();
}
window.onload = () => {
  fetch(url, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("errore");
      }
    })

    .then((data) => {
      fetch(data.tracklist).then((res) => {
        return res.json();
      });

      image.src = data.picture;
      const contenuti = `<div id =main-scroll>
      <div id='backgroundRelative'>
  <div id='backgroundImage'>
  </div>
  <div id='backgroundImage2'>
    <p class='artistaVerificato d-none d-md-block'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-primary bi bi-patch-check-fill mb-1" viewBox="0 0 16 16">
    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"/>
  </svg>&nbsp;Artista verificato</p>
  <h1>${data.name}</h1>
  <p class='ascoltiMensili'>${data.nb_fan} ascoltatori mensili</p>
  </div>
  </div>
  <!---->
  <div class='vedoNonVedo text-secondary p-3'>${data.nb_fan} ascoltatori mensili</div>
  <div class='vedoNonVedo'>
  <div class='d-flex justify-content-between align-items-center p-3 pb-0'><div class='d-flex align-items-center'><p class='m-0 px-3 py-1 border rounded-1 me-4 follow' onclick="toggleFollow()">FOLLOW</p>
  <div class="dropdown pb-3" onclick='toggleGreen(this)'><svg xmlns="http://www.w3.org/2000/svg" role="button" data-bs-toggle="dropdown" aria-expanded="false" width="30" height="30" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
</svg><ul class="dropdown-menu">
<li><a class="dropdown-item" href="#">Action</a></li>
<li><a class="dropdown-item" href="#">Another action</a></li>
<li><a class="dropdown-item" href="#">Something else here</a></li>
</ul>
</div></div>
<div class='d-flex justify-content-center align-items-center me-2'>
<svg  onclick='toggleGreen(this)' xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-shuffle me-3" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
  <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
</svg>
<div class='d-flex justify-content-center align-items-center p-2 rounded-circle playButtonHover' onclick='ArtistPlayer(globalPlayData)'><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
</svg></div>
</div>
</div>
  </div>
  <div class='playFollow d-flex align-items-center p-5 pb-0'><div class='me-3 d-flex justify-content-center align-items-center p-2 rounded-circle playButtonHover' onclick='ArtistPlayer(globalPlayData)'><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-play-fill text-black" viewBox="0 0 16 16">
  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
  </svg></div>
<p class='m-0 px-3 py-1 border rounded-1 me-4 follow' onclick="toggleFollow()">FOLLOW</p>
<div class="dropdown pb-3" >
          <svg href="#" onclick='toggleGreen(this)' role="button" data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg"
            width="30" height="30" fill="currentColor" class="bi bi-three-dots text-white" viewBox="0 0 16 16">
            <path
              d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
        </div>
        <!---->
        <div class='row p-5'>
        <div class='popolari col-12 col-md-8'>
        <h3 class= 'mb-4'>Popolari</h3>
        <div id='tracksX5'></div>
        </div>
        <div class='col-12 col-md-4 pb-3'>
        <h3 class= 'mb-4' >Brani che ti piacciono</h3>
        <div class='row'>
        <div class='col-3 p-0 d-flex justify-content-center cuoreRelative'><img id='immagineCanvas' src='${data.picture}' width='70' height='70' class='rounded-circle'><div class='cuoreAbsolute rounded-circle bg-success border'><svg xmlns="http://www.w3.org/2000/svg" width="25" height="10" fill="currentColor" class="bi bi-heart-fill text-white" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
      </svg></div></div><div class='col-9 d-flex flex-column justify-content-center p-0'><p class='mb-1'>Hai messo Mi piace a 11 brani</p><p class='m-0 text-secondary'>Di ${data.name}</p></div></div>
        </div>
        </div></div>`;
      mainContent.innerHTML += contenuti;
      const trackDiv = document.getElementById("tracksX5");
      const artistDiv = document.getElementById("backgroundImage");
      artistDiv.style.backgroundImage = `url(${data.picture_xl})`;
      tracks();
      async function tracks() {
        fetch(data.tracklist)
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("errore");
            }
          })
          .then((data) => {
            for (let i = 0; i < 5; i++) {
              const p = `
    <div class='row d-flex TrackHover pt-3'>
      <p class='col-1 d-flex justify-content-center align-items-center text-secondary indiceTracks' onclick="ArtistPlayer(globalData.data[${i}])">${
                i + 1
              }</p>
      <p class='col-1 d-none justify-content-center align-items-center text-secondary playHoverTrack' onclick="ArtistPlayer(globalData.data[${i}])"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
    </svg></p>
      <p class='col-1 d-flex justify-content-center align-items-center' onclick="ArtistPlayer(globalData.data[${i}])"><img src='${
                data.data[i].album.cover
              }' width='40' height='40'></p>
      <div class='col-8 d-md-flex justify-content-between align-items-center' onclick="ArtistPlayer(globalData.data[${i}])">
        <p class='m-0 mb-md-3'>${data.data[i].title}</p>
        <p class='text-secondary'>${data.data[i].rank}</p>
      </div>
      <p class='col-2 d-none d-md-flex justify-content-center align-items-center text-secondary'>${convertiDurata(
        data.data[i].duration
      )} <span class='cuoreHover ms-2 text-white d-none'><svg onclick='toggleGreen(this)' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
    </svg></span></p>
      <div class="dropdown col-2 vedoNonVedo mt-1"><span class='cuoreHover me-2 text-white d-none'><svg onclick='toggleGreen(this)' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
    </svg></span>
        <svg onclick='toggleGreen(this)' xmlns="http://www.w3.org/2000/svg" role="button" data-bs-toggle="dropdown" aria-expanded="false" width="30" height="30" fill="currentColor" class="bi bi-three-dots-vertical text-secondary" viewBox="0 0 16 16">
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
        </svg>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </div>
    </div>
  `;
              trackDiv.innerHTML += p;
            }
          })
          .catch((err) => {
            console.log(err);
          });
        function convertiDurata(secondi) {
          const minuti = Math.floor(secondi / 60);
          const restantiSecondi = secondi % 60;

          const durataFormattata = `${minuti}:${
            restantiSecondi < 10 ? "0" : ""
          }${restantiSecondi}`;
          return durataFormattata;
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

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
