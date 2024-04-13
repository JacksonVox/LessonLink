const addStudentModal = document.getElementById("addStudentModal");
const viewStudentModal = document.getElementById("viewStudentModal");
const closeBtn = document.getElementsByClassName("close");
const addStudentButton = document.getElementById("addItemButton");
let selectedStudentId = null;

// Close Modals
document.onclick = function (event) {
  if (event.target.matches("#addStudentModal") || event.target.matches("#viewStudentModal") || event.target.matches(".close")) {
    addStudentModal.style.display = "none";
    viewStudentModal.style.display = "none";
  }
};

addStudentButton.onclick = function () {
  openAddStudentModal();
};

function openAddStudentModal() {
  addStudentModal.style.display = "flex";
}

// Event Listeners

//Student List Listeners
