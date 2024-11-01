const assignmentList = document.querySelector(".assignment-list");
const inviteStudentButton = document.getElementById("inviteStudentButton");
const editStudentButton = document.getElementById("editStudentButton");
const saveStudentEditButton = document.getElementById("save-changes");

// Functions

function openInviteModal() {
  console.log("clicked");
  inviteStudentModal.style.display = "flex";
}

function routeUnassignDocument(event) {
  const assignmentId = event.target.getAttribute("data-doc-id");
  const studentId = event.target.getAttribute("data-student-id");
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

function openEditModal() {
  editStudentModal.style.display = "flex"
}

// Close Modal
document.onclick = function (event) {
  if (
    event.target.matches("#inviteStudentModal") ||
    event.target.matches("#editStudentModal") ||
    event.target.matches("#viewDocModal") ||
    event.target.matches(".close")
  ) {
    inviteStudentModal.style.display = "none";
    editStudentModal.style.display = "none";
    viewDocModal.style.display = "none";
  }
};

// View Document Modal
const viewDocModal = document.getElementById("viewDocModal");
const deleteDocBtn = document.getElementById("delete-document")
const openDocBtn = document.getElementById("open-document")



window.onclick = function(event) {
  if (event.target == viewDocModal) {
    viewDocModal.style.display = "none";
  }
}

function openViewDocModal(title, description, fileUrl, previewUrl, docId, docCloudId, studentId) {
  document.getElementById("docTitle").innerText = title;
  document.getElementById("docDescription").innerText = description;
  document.getElementById("docFile").src = previewUrl;
  deleteDocBtn.setAttribute("data-doc-id", docId);
  deleteDocBtn.setAttribute("data-student-id", studentId);
  deleteDocBtn.setAttribute("data-doc-cloud-id", docCloudId);
  openDocBtn.href = fileUrl;
  viewDocModal.style.display = "flex";
}

//Event Listeners

// Invite Student Listener
inviteStudentButton.addEventListener("click", function (event) {
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

// Edit Student

editStudentButton.addEventListener("click", () => openEditModal());

saveStudentEditButton.addEventListener("click", function() {
  const newName = document.getElementById("new-name").value;
  const newNote = document.getElementById("new-note").value;
  saveStudentEdit(newName, newNote);
});

async function saveStudentEdit(newName, newNote) {
  if (newName !== student.userName || newNote !== student.note) {
    try {
      const response = await fetch(`/students/editStudent`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId: student._id, studentName: newName, studentNote: newNote }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        location.reload();
      } else {
        console.error("Failed to update student information");
      }
    } catch (error) {
      console.error("Error updating student information:", error);
    }
  } else {
    alert("No changes detected.");
  }
}



// Copy Invite link button listener
const copyInviteLinkButton = document.getElementById("copyInviteLink");
const inviteLinkInput = document.getElementById("inviteLink");

copyInviteLinkButton.addEventListener("click", function(event) {
  event.preventDefault();

  inviteLinkInput.select();

  navigator.clipboard.writeText(inviteLinkInput.value).then(function() {
    alert("Invite link copied to clipboard!");
  }).catch(function(error) {
    console.error("Failed to copy text: ", error);
  });
});

// Assignment List Listener
assignmentList.addEventListener("click", (event) => {

  if (event.target.matches(".incomplete > .markCompleteCheckbox")) {
    routeMarkComplete(event);
    return;
  } else if (event.target.matches(".complete > .markCompleteCheckbox")) {
    routeMarkIncomplete(event);
    return;
  }

  const listItem = event.target.closest('.list-item')
  if (listItem) {
    const title = listItem.getAttribute("data-title");
    const description = listItem.getAttribute("data-description");
    const fileUrl = listItem.getAttribute("data-file-url");
    const previewUrl = `https://res.cloudinary.com/dxxfdmsh3/image/upload/t_pdf-to-jpg/${listItem.getAttribute("cloudinary-id")}`;
    const docCloudId = listItem.getAttribute("cloudinary-id");
    const docId = listItem.getAttribute("data-id")
    const studentId = listItem.getAttribute("data-student-id")
    openViewDocModal(title, description, fileUrl, previewUrl, docId, docCloudId, studentId);
  }
});

deleteDocBtn.addEventListener("click", (event) => {
  const confirmed = confirm("Remove this assignment from this student?")
  if (confirmed) { routeUnassignDocument(event) }
});