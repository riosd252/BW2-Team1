document.addEventListener("DOMContentLoaded", function () {
  const artists = [
    "Eminem",
    "Vasco-Rossi",
    "shakira",
    "sfera-ebbasta",
    "pink-floyd",
    "rihanna",
    "domenico-modugno",
    "marracash",
    "lazza",
    "xxxtentacion",
    "coez",
    "ludwig",
  ];
  fetchTracksByArtists(artists, 2);
});

function fetchTracksByArtists(artists, numTracks) {
  const promises = artists.map((artist) =>
    fetch(
      `https://deezerdevs-deezer.p.rapidapi.com/search?q=artist:"${encodeURIComponent(artist)}"&limit=${numTracks}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "f8c6943d93msh1d1ded0507d1851p17c44djsn3c38bf1a0938",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => data.data)
      .catch((error) => console.error(`Errore nel fetch dei dati per ${artist}:`, error))
  );

  Promise.all(promises)
    .then((allTracksArrays) => {
      const combinedTracks = allTracksArrays.flat();
      console.log(combinedTracks);
      popolaNextWick(combinedTracks);
      creaEpopolaCards(combinedTracks);
      updateDOMWithAlbumData(combinedTracks);
    })
    .catch((error) => console.error("Errore durante il recupero dei dati:", error));
}
function updateDOMWithAlbumData(tracks) {
  const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];

  if (randomTrack && randomTrack.album) {
    const adImg = document.getElementById("ad-img");
    const adTitle = document.getElementById("ad-title");
    const adArtist = document.getElementById("banner-text").getElementsByTagName("p")[1];
    const playButton = document.getElementById("play-button");
    const goToAlbumLink = document.querySelector('.dropdown-item[href^="album.html"]');
    const goToAlbumLink2 = document.querySelector('.dropdown-item[href^="artist.html"]');

    adImg.src = randomTrack.album.cover_medium || "./assets/imgs/main/default-image.jpg";
    adImg.alt = "Cover di " + randomTrack.album.title;
    adTitle.textContent = randomTrack.album.title;
    adArtist.textContent = randomTrack.artist.name;
    playButton.setAttribute("data-track-preview", randomTrack.preview);
    if (goToAlbumLink) {
      goToAlbumLink.href = `album.html?id=${randomTrack.album.id}`;
    }
    if (goToAlbumLink2) {
      goToAlbumLink2.href = `artist.html?id=${randomTrack.artist.id}`;
    }
  }
}
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
  "Stairway to Heaven - Led Zep...",
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
    a.href = "#";
    a.textContent = nomeCanzone;
    li.appendChild(a);
    sideScroll.appendChild(li);
  });
}

popolaSideScroll();

function mescolaArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function popolaNextWick(tracks) {
  mescolaArray(tracks);
  const cards = document.querySelectorAll("#next-wick .card");

  cards.forEach((card, index) => {
    const track = tracks[index % tracks.length];

    const img = card.querySelector("img");
    const title = card.querySelector(".card-body p");

    img.src = track.album.cover_medium || "./assets/imgs/main/default-image.jpg";
    img.alt = "Cover di " + track.album.title;
    title.innerHTML = `
      <a href="album.html?id=${track.album.id}" class="text-decoration-none text-white">${
      track.title || "Titolo Sconosciuto"
    }</a>
      <br/>
       <a href="artist.html?id=${track.artist.id}" class="text-decoration-none text-white">${
      track.artist.name || "Sconosciuto"
    }</a>
    `;

    img.addEventListener("click", () => attivaPlayerBarConDettagli(track));
  });
}

function creaEpopolaCards(tracks) {
  const container = document.getElementById("favourites-cards");
  let tracksCopy = [...tracks];
  mescolaArray(tracksCopy);

  tracksCopy.forEach((track) => {
    const card = document.createElement("div");
    card.className = "col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2";
    card.innerHTML = `
      <div class="card bg-cards-favourites border-0">
          <div class="card-body text-truncate" style="max-width: 150px">
              <img src="${
                track.album.cover_medium || "./assets/imgs/main/default-image.jpg"
              }" class="card-img-top rounded" alt="Cover di ${track.title}">
              <h5 class="card-title mt-2"><a href="album.html?id=${
                track.album.id
              }" class="text-decoration-none text-white">${track.title || "Titolo Sconosciuto"}</a></h5>
              <p class="card-text"> <a href="artist.html?id=${
                track.artist.id
              }" class="text-decoration-none text-white">${track.artist.name || "Sconosciuto"}</a></p>
          </div>
      </div>
    `;
    container.appendChild(card);

    const img = card.querySelector("img");
    img.addEventListener("click", () => attivaPlayerBarConDettagli(track));
  });
}

function riproduciAudio(url) {
  if (!url) {
    console.log("Nessun brano da riprodurre");
    return;
  }

  if (currentAudio) {
    currentAudio.pause();
  }

  currentAudio = new Audio(url);
  currentAudio.play().catch((error) => console.error("Errore nella riproduzione del brano:", error));
}

function attivaPlayerBarConDettagli(track) {
  document.getElementById("player-bar").style.display = "block";
  document.getElementById("player-bar-img").src = track.album.cover_medium;
  document.getElementById("player-bar-title").textContent = track.title;
  document.getElementById("player-bar-artist").textContent = track.artist.name;

  riproduciAudio(track.preview);
}

const removeAdButton = document.getElementById("rem-ad");
removeAdButton.addEventListener("click", (event) => {
  const adBanner = document.getElementById("ad-banner");
  adBanner.remove();
});

document.getElementById("play-button").addEventListener("click", function () {
  let adBannerImg = document.getElementById("ad-img").src;
  let adBannerTitle = document.getElementById("ad-title").textContent;
  let adBannerArtist = document.getElementById("banner-text").getElementsByTagName("p")[1].textContent;

  document.getElementById("player-bar").style.display = "block";
  document.getElementById("player-bar-img").src = adBannerImg;
  document.getElementById("player-bar-title").textContent = adBannerTitle;
  document.getElementById("player-bar-artist").textContent = adBannerArtist;
});
let currentAudio = null;

document.getElementById("play-button").addEventListener("click", function () {
  let previewUrl = this.getAttribute("data-track-preview");
  if (previewUrl) {
    if (!currentAudio) {
      currentAudio = new Audio(previewUrl);
    } else {
      if (currentAudio.src !== previewUrl) {
        currentAudio.src = previewUrl;
      }
    }

    currentAudio.currentTime = 0;
    currentAudio.play();
  } else {
    console.log("Nessun brano da riprodurre");
  }
});
function creaControlliPlayer() {
  const container = document.querySelector(".col-6.d-flex.flex-column.align-items-center");

  const controlliDiv = document.createElement("div");
  controlliDiv.id = "controlli-player";
  const prevBtn = document.createElement("button");
  prevBtn.id = "prev-track-btn";
  prevBtn.textContent = "Indietro";
  controlliDiv.appendChild(prevBtn);
  //avanti&indietro
  const nextBtn = document.createElement("button");
  nextBtn.id = "next-track-btn";
  nextBtn.textContent = "Avanti";
  controlliDiv.appendChild(nextBtn);

  const playPauseBtn = document.createElement("button");
  playPauseBtn.id = "play-pause-btn";
  playPauseBtn.textContent = "Play";
  controlliDiv.appendChild(playPauseBtn);

  const volumeControl = document.createElement("input");
  volumeControl.type = "range";
  volumeControl.id = "volume-control";
  volumeControl.min = "0";
  volumeControl.max = "1";
  volumeControl.step = "0.01";
  volumeControl.value = "0.5";
  controlliDiv.appendChild(volumeControl);

  container.appendChild(controlliDiv);
}

creaControlliPlayer();

document.addEventListener("DOMContentLoaded", function () {
  const playPauseBtn = document.getElementById("play-pause-btn");
  const volumeControl = document.getElementById("volume-control");
  document.getElementById("prev-track-btn").addEventListener("click", function () {
    if (currentAudio) {
      currentAudio.currentTime = Math.max(0, currentAudio.currentTime - 2);
    }
  });

  document.getElementById("next-track-btn").addEventListener("click", function () {
    if (currentAudio) {
      currentAudio.currentTime = Math.min(currentAudio.duration, currentAudio.currentTime + 2);
    }
  });

  playPauseBtn.addEventListener("click", function () {
    if (currentAudio) {
      if (currentAudio.paused) {
        currentAudio.play();
        this.textContent = "Pause";
      } else {
        currentAudio.pause();
        this.textContent = "Play";
      }
    }
  });

  volumeControl.addEventListener("input", function () {
    if (currentAudio) {
      currentAudio.volume = this.value;
    }
  });
});
