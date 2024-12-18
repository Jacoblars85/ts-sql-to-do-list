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
      <button id="${todo.id}" class="delete" onclick="deleteButton(event)" >Delete</button>
      </ul>
      `;
    } else if (isComplete === false) {
      toDoBody.innerHTML += `
        <ul>${todo.text} 
        <button id="${todo.id}" class="complete" onclick="completeTodo(event)" >Complete</button>
        <button id="${todo.id}" class="delete" onclick="deleteButton(event)" >Delete</button>
        </ul>
        `;
    }
  }
}

//post route
function postTodos(event) {
  console.log("clicking add");

  let todoInput: any = document.getElementById("toDoTextInput") as HTMLInputElement;

  let newTodo: object = {
    text: todoInput.value,
  };

  //   clears input
  todoInput.value = "";

  axios({
    url: "/todos",
    method: "POST",
    data: newTodo,
  })
    .then((response) => {
      getTodos();
    })
    .catch((error) => {
      console.log(error, "Error in posting todos");
    });
}

//put route
function completeTodo(event) {
  console.log("finishing that task");

  let todo: any = event.target;

  axios({
    url: `/todos/${todo.id}`,
    method: "PUT",
  })
    .then((response) => {
      getTodos();
    })
    .catch((error) => {
      console.log(error, "Error in completing todo");
    });
}

//delete route
function deleteButton(event) {
  console.log("trying to delete");

  let todo: any = event.target;

  axios({
    method: "DELETE",
    url: `/todos/${todo.id}`,
  })
    .then((response) => {
      getTodos();
    })
    .catch((error) => {
      console.log("delete /todos/:id fail", error);
    });
}

getTodos();
