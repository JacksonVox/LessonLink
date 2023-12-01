const deleteBtn = document.querySelectorAll('.delete-button')
const todoBtn = document.querySelectorAll('button.not')
const todoComplete = document.querySelectorAll('button.completed')
const assignTeacherDropdowns = document.querySelectorAll('.assign-user')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteDocument)
})

Array.from(todoBtn).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

Array.from(assignTeacherDropdowns).forEach(dropdown => {
    dropdown.addEventListener('change', async (event) => {
      const userId = event.target.value;
      const documentId = event.target.closest('.document').dataset.id;
  
      try {
        const response = await fetch(`/todos/assignDocument/${documentId}/${userId}`, {
          method: 'PUT',
          headers: {'Content-type': 'application/json'}
        });
  
        if (!response.ok) {
          throw new Error(`Network response was not ok ${response.ok}`);
        }
  
        const data = await response.json();
        console.log(data);
        location.reload();
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    });
  });

async function deleteDocument(){
    const documentId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteDocument', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'documentIdFromJSFile': documentId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const documentId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'documentIdFromJSFile': documentId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const documentId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'documentIdFromJSFile': documentId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

// On window content loaded

window.addEventListener('DOMContentLoaded', (event) => {
    const todoInput = document.querySelector('.todo-input');
    if (todoInput) {
        todoInput.focus();
    }
});