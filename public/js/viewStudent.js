const assignmentList = document.querySelector('.assignment-list');


// Event Listeners

// Assignment List Listener
assignmentList.addEventListener('click', function(event) {
  if (event.target.matches('.delete-button')) {
    deleteAssignment(event);
  } else if (event.target.matches('button.not')) {
    addComplete(event);
  } else if (event.target.matches('button.completed')) {
    removeComplete(event);
  }
});