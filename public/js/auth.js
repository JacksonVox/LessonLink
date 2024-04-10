document.querySelector('.btn-1').addEventListener('click', function(event) {
  event.preventDefault();
  let form = document.querySelector('form');
  
  form.submit();
});