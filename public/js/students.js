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

const studentBtn = document.querySelectorAll(".student-name");

Array.from(studentBtn).forEach((el) => {
  el.addEventListener("click", openViewStudentModal);
});

async function openViewStudentModal() {
  let selectedStudentId = this.parentNode.dataset.id;
  
  let response = await fetch(`/students/viewStudent/${selectedStudentId}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  let selectedStudent = await response.json();

  document.querySelector("#viewStudentModal .name").value = selectedStudent.userName;
  document.querySelector("#viewStudentModal .description").value = selectedStudent.note;
  viewStudentModal.style.display = "flex";
}