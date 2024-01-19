const addStudentModal = document.getElementById("addStudentModal");
const viewStudentModal = document.getElementById("viewStudentModal");
const closeBtn = document.getElementsByClassName("close");
const addStudentButton = document.getElementById("addStudentButton");
let selectedStudentId = null;

// Close Modals
document.onclick = function (event) {
  if (event.target == addStudentModal || event.target == viewStudentModal || event.target == closeBtn) {
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
  el.addEventListener("click", viewStudent);
});
[]