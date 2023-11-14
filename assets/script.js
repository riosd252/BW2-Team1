document.querySelector(".toggle-button").addEventListener("click", function () {
  let ul = this.nextElementSibling;
  if (ul.style.display === "none") {
    ul.style.display = "block";
  } else {
    ul.style.display = "none";
  }
});
