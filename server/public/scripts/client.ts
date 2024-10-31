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
    const toDoBody: any = document.getElementById('todoBody');
    toDoBody.innerHTML = '';
  
    for (let todo of todos) {
      let isComplete = todo.isComplete
  
      if (isComplete === true) {
        toDoBody.innerHTML += `
      <ul class="completed" data-todoId="${todo.id}" >${todo.text} 
      <button class="delete" onclick="deleteButton(event)" >Delete</button>
      </ul>
      `
      } else if (isComplete === false) {
        toDoBody.innerHTML += `
        <ul data-todoId="${todo.id}" >${todo.text} 
        <button class="complete" onclick="makeComplete(event)" >Complete</button>
        <button class="delete" onclick="deleteButton(event)" >Delete</button>
        </ul>
        `
      }
    }
  }

  getTodos()