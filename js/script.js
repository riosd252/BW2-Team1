document.querySelector(".toggle-button").addEventListener("click", function () {
  let ul = this.nextElementSibling;
  if (ul.style.display === "none") {
    ul.style.display = "block";
  } else {
    ul.style.display = "none";
  }
});

const removeAdButton = document.getElementById("rem-ad");
removeAdButton.addEventListener("click", (event) => {
  const adBanner = document.getElementById("ad-banner");
  adBanner.remove();
});

const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=fedez";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "f8c6943d93msh1d1ded0507d1851p17c44djsn3c38bf1a0938",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

fetch(url, options)
  .then((resp) => resp.json())
  .then((parsedobj) => console.log(parsedobj));
window.onload = function () {
  fetchAlbumDataAndUpdateDOM();
};

function fetchAlbumDataAndUpdateDOM() {
  const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=fedez";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f8c6943d93msh1d1ded0507d1851p17c44djsn3c38bf1a0938",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((resp) => resp.json())
    .then((parsedObj) => {
      updateDOMWithAlbumData(parsedObj);
    })
    .catch((error) => console.error("Error fetching album data:", error));
}

function updateDOMWithAlbumData(data) {
  const ramNum = Math.floor(Math.random() * 25);
  const albumInfo = data.data[ramNum].album;
  const artistName = data.data[ramNum].artist.name;

  document.getElementById("ad-img").src = albumInfo.cover_medium;

  document.getElementById("ad-title").textContent = albumInfo.title;

  const artistElement = document.getElementById("banner-text").getElementsByTagName("p")[1];
  artistElement.textContent = artistName;
  const artistElement2 = document.getElementById("banner-text").getElementsByTagName("p")[2];
  artistElement2.textContent = `Ascolta il nuovo singolo di ${artistName}`;
}
