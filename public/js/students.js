const addStudentModal = document.getElementById("addStudentModal");
const viewStudentModal = document.getElementById("viewStudentModal");
const closeBtn = document.getElementsByClassName("close");
const addStudentButton = document.getElementById("addItemButton");
const studentGrid = document.querySelector('.student-grid');

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

studentGrid.addEventListener('click', (event) => {
  // Find the closest ancestor with the class 'list-item'
  const listItem = event.target.closest('.list-item');

  // Check if such an ancestor exists
  if (listItem) {
    // Get the student ID from the data-id attribute
    const studentId = listItem.getAttribute('data-id');

    // Navigate to the new route
    window.location.href = `/students/viewStudent/${studentId}`;
  }
});

//Student List Listeners
