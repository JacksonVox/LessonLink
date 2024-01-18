const addStudentModal = document.getElementById("addStudentModal");
const viewStudentModal = document.getElementById("viewStudentModal");
const closeBtn = document.getElementsByClassName("close");
const addStudentButton = document.getElementById("addStudentButton");
let selectedStudentId = null;

// Close Modals
Array.from(closeBtn).forEach((btn) => {
  btn.onclick = function () {
    addStudentModal.style.display = "none";
    viewStudentModal.style.display = "none";
  };
});

window.onclick = function (event) {
  if (event.target == addStudentModal || event.target == viewStudentModal) {
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
const studentBtn = document.querySelectorAll(".student-name");

Array.from(studentBtn).forEach((el) => {
  el.addEventListener("click", openViewStudentModal);
});
[]