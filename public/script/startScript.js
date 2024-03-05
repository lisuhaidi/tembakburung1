// set name player
function setNamePlayer() {
  localStorage.setItem("namePlayer", inputPlayer.value.trim());
  document.getElementById("namePlayer").innerHTML =
    localStorage.getItem("namePlayer");
  reloadPage();
}
// fungsi reload
function reloadPage() {
  location.reload(); // Memuat ulang halaman web
}

document.addEventListener("DOMContentLoaded", (event) => {
  const namePlayer = localStorage.getItem("namePlayer");
  const inputnamePlayer = document.getElementById("inputnamePlayer");
  const containerStart = document.getElementById("containerStart");
  if (namePlayer) {
    inputnamePlayer.style.display = "none";
    containerPlayer.style.display = "flex";
  } else {
    console.log("sukses");
    inputnamePlayer.style.display = "block";
    containerStart.style.display = "none";
  }
});
