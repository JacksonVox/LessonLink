// Click listener for submit button
document.querySelector('.btn-1').addEventListener('click', function(event) {
  event.preventDefault();
  let form = document.querySelector('form');
  form.submit();
});

//keydown listener to submit form
document.querySelector('form').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    // Submit form
    this.submit();
  }
});