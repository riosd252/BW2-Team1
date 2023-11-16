const url = "https://deezerdevs-deezer.p.rapidapi.com/album/50036922";
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
          const playerImg = document.getElementById("player-img");
          playerImg.setAttribute("src", track.album.cover_small);
          const playerTitle = document.getElementById("player-title");
          playerTitle.innerText = track.title;
          const playerArtist = document.getElementById("player-artist");
          playerArtist.innerText = track.artist.name;
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
