console.log('JS is sourced!');


//get route
function getTodos() {
    console.log('in get route');

  axios({
    url: '/todos',
    method: 'GET'
  }).then((response) => {
    renderTodos(response.data)
  })
}

//render route
function renderTodos(todos) {
    console.log('in render function');
    const toDoBody = document.getElementById('todoBody');
    toDoBody.innerHTML = '';
  
    for (let todo of todos) {
      let isComplete = todo.isComplete
  
      if (isComplete === true) {
        toDoBody.innerHTML += `
      <ul data-testid="toDoItem" class="completed" data-todoId="${todo.id}" >${todo.text} 
      <button data-testid="deleteButton" class="delete" onclick="deleteButton(event)" >Delete</button>
      </ul>
      `
      } else if (isComplete === false) {
        toDoBody.innerHTML += `
        <ul data-testid="toDoItem" data-todoId="${todo.id}" >${todo.text} 
        <button data-testid="completeButton" class="complete" onclick="makeComplete(event)" >Complete</button>
        <button data-testid="deleteButton" class="delete" onclick="deleteButton(event)" >Delete</button>
        </ul>
        `
      }
    }
  }