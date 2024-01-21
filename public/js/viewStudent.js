const assignmentList = document.querySelector(".assignment-list");
const openInviteStudentModal = document.getElementById(
  "openInviteStudentModal"
);
const inviteStudentModal = document.getElementById("inviteStudentModal");
const copyInviteLinkButton = document.getElementById("copyInviteLink");

// Functions

function openInviteModal() {
  console.log("clicked");
  inviteStudentModal.style.display = "flex";
}

function routeUnassignDocument(event) {
  const assignmentId = event.target.parentElement.getAttribute("data-id");
  const studentId = event.target.parentElement.getAttribute("data-student-id");
  console.log(studentId);

  fetch(`/students/unassignDocument`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ studentId, assignmentId }),
  })
    .then((response) => {
      if (response.ok) {
        location.reload();
      } else {
        console.error("Failed to unassign document");
      }
    })
    .catch((error) => console.error(error));
}

function routeMarkComplete(event) {
  const assignmentId = event.target.parentElement.getAttribute("data-id");
  const studentId = event.target.parentElement.getAttribute("data-student-id");

  fetch(`/students/markComplete`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ studentId, assignmentId }),
  })
    .then((response) => {
      if (response.ok) {
        location.reload();
      } else {
        console.error("Failed to mark document complete");
      }
    })
    .catch((error) => console.error(error));
}

function routeMarkIncomplete(event) {
  const assignmentId = event.target.parentElement.getAttribute("data-id");
  const studentId = event.target.parentElement.getAttribute("data-student-id");

  fetch(`/students/markIncomplete`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ studentId, assignmentId }),
  })
    .then((response) => {
      if (response.ok) {
        location.reload();
      } else {
        console.error("Failed to mark document incomplete");
      }
    })
    .catch((error) => console.error(error));
}

// Assignment List Listener
assignmentList.addEventListener("click", function (event) {
  if (event.target.matches(".delete-button")) {
    routeUnassignDocument(event);
  } else if (event.target.matches(".incomplete > .markCompleteCheckbox")) {
    routeMarkComplete(event);
  } else if (event.target.matches(".complete > .markCompleteCheckbox")) {
    routeMarkIncomplete(event);
  }
});

// Invite Student Listener
openInviteStudentModal.addEventListener("click", function (event) {
  const studentId = event.target.getAttribute("data-student-id");
  const studentName = event.target.getAttribute("data-student-name");
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  if (isMobile && navigator.share) {
    console.log("navigator share true");
    navigator.share({
      title: "LessonLink",
      text: `Hello ${studentName}! Welcome to LessonLink.`,
      url: "http://localhost:2121/studentHome/" + studentId,
    });
  } else {
    openInviteModal();
  }
});
// Copy Invite link button listener
copyInviteLinkButton.addEventListener("click", copyInviteLink)

function copyInviteLink() {
  event.preventDefault();
  const inviteLink = document.getElementById("inviteLink").value;
  navigator.clipboard.writeText(inviteLink);
}

// Close Modal
document.onclick = function (event) {
  if (
    event.target.matches("#inviteStudentModal") ||
    event.target.matches(".close")
  ) {
    inviteStudentModal.style.display = "none";
  }
};
