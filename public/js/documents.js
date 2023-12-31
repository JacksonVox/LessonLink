const modal = document.getElementById("createDocModal");
const span = document.getElementsByClassName("close")[0];
const btn = document.getElementById("myBtn");

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

btn.onclick = function() {
    openModal();
}

function openModal() {
  modal.style.display = "flex";
}