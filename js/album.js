const url = "https://deezerdevs-deezer.p.rapidapi.com/album/424931";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "6788386030msha48a368adad879cp1b187ajsn6a3f06babbb5",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const albumImg = document.getElementById("album-img");
  const mArtistImg = document.getElementById("m-as-artist-img");
  const mArtist = document.getElementById("m-artist");
  const mAlbumYear = document.getElementById("m-album-year");
  const mTracks = document.getAnimations("m-tracks");
  const mAlbumDuration = document.getElementById("m-album-duration");
  const albumTitle = document.getElementById("album-title");
  const dArtistImg = document.getElementById("d-as-artist-img");
  const dArtist = document.getAnimations("d-artist");
  const dAlbumYear = document.getElementById("d-album-year");
  const dTracks = document.getElementById("d-tracks");
  const dAlbumDuration = document.getElementById("d-album-duration");

  fetch(url, options)
    .then((resp) => resp.json())
    .then((albumObj) => {
      albumImg.setAttribute("src", albumObj.cover_medium);
      mArtistImg.setAttribute("src", albumObj.artist.picture_small);
      dArtistImg.setAttribute("src", albumObj.artist.picture_small);
      mArtist.innerText = albumObj.artist.name;
      dArtist.innerText = albumObj.artist.name;
      mAlbumYear.innerText = albumObj.release_date;
      dAlbumYear.innerText = albumObj.release_date;
      mTracks.innerText = albumObj.nb_tracks;
      dTracks.innerText = albumObj.nb_tracks;
      mAlbumDuration.innerText = albumObj.duration;
      dAlbumDuration.innerText = albumObj.duration;
      albumTitle.innerText = albumObj.title;
    });
});
