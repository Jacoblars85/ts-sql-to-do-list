console.log("JS is sourced!");

//get route
function getTodos() {
  console.log("in get route");

  axios({
    url: "/todos",
    method: "GET",
  }).then((response) => {
    renderTodos(response.data);
  });
}

//render route
function renderTodos(todos) {
  console.log("in render function");
  const toDoBody: any = document.getElementById("todoBody");
  toDoBody.innerHTML = "";

  for (let todo of todos) {
    let isComplete = todo.isComplete;

    if (isComplete === true) {
      toDoBody.innerHTML += `
      <ul class="completed" >${todo.text} 
      <button class="delete" onclick="deleteButton(event)" >Delete</button>
      </ul>
      `;
    } else if (isComplete === false) {
      toDoBody.innerHTML += `
        <ul>${todo.text} 
        <button class="complete" onclick="makeComplete(event)" >Complete</button>
        <button class="delete" onclick="deleteButton(event)" >Delete</button>
        </ul>
        `;
    }
  }
}

//post route
function postTodos(event) {
    console.log('clicking add');
  
    let todoInput = document.getElementById('toDoTextInput') as HTMLInputElement;
  
  let newTodo = {
    text: todoInput.value
  };
  
//   clears input
  todoInput.value = '';

  console.log('newTodo', newTodo);
  
  
    axios({
      url: '/todos',
      method: 'POST',
      data: newTodo
    }).then((response) => {
      getTodos()
    }).catch((error) =>{
      console.log(error, 'Error in posting todos');
    })
  }

//put route
function makeComplete(event) {
    console.log('finishing that task');
    let todoId = event.target.closest('ul').getAttribute('data-todoId');

    console.log('todoId', todoId);
 
  
    axios({
      url: `/todos/${todoId}`,
      method: 'PUT'
    }).then((response) => {
      getTodos()
    }).catch((error) =>{
      console.log(error, 'Error in completing todo');
    })
   
  }



getTodos();
