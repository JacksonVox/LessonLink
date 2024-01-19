const assignmentList = document.querySelector('.assignment-list');


// Event Listeners

// Assignment List Listener
assignmentList.addEventListener('click', function(event) {
  if (event.target.matches('.delete-button')) {
    routeUnassignDocument(event);
  } else if (event.target.matches('button.not')) {
    addComplete(event);
  } else if (event.target.matches('button.completed')) {
    removeComplete(event);
  }
});

// Functions
function routeUnassignDocument(event) {
  const assignmentId = event.target.parentElement.getAttribute('data-id');
  const studentId = event.target.parentElement.getAttribute('data-student-id');
  console.log(studentId);

  fetch(`/students/unassignDocument`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ studentId, assignmentId }),
  })
  .then(response => {
    if (response.ok) {
      location.reload();
    } else {
      console.error('Failed to unassign document');
    }
  })
  .catch(error => console.error(error));
}