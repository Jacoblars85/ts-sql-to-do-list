console.log("JS is sourced!");
//get route
function getTodos() {
    console.log("in get route");
    axios({
        url: "/todos",
        method: "GET",
    }).then(function (response) {
        renderTodos(response.data);
    });
}
//render route
function renderTodos(todos) {
    console.log("in render function");
    var toDoBody = document.getElementById("todoBody");
    toDoBody.innerHTML = "";
    for (var _i = 0, todos_1 = todos; _i < todos_1.length; _i++) {
        var todo = todos_1[_i];
        var isComplete = todo.isComplete;
        if (isComplete === true) {
            toDoBody.innerHTML += "\n      <ul class=\"completed\" >".concat(todo.text, " \n      <button id=\"").concat(todo.id, "\" class=\"delete\" onclick=\"deleteButton(event)\" >Delete</button>\n      </ul>\n      ");
        }
        else if (isComplete === false) {
            toDoBody.innerHTML += "\n        <ul>".concat(todo.text, " \n        <button id=\"").concat(todo.id, "\" class=\"complete\" onclick=\"completeTodo(event)\" >Complete</button>\n        <button id=\"").concat(todo.id, "\" class=\"delete\" onclick=\"deleteButton(event)\" >Delete</button>\n        </ul>\n        ");
        }
    }
}
//post route
function postTodos(event) {
    console.log("clicking add");
    var todoInput = document.getElementById("toDoTextInput");
    var newTodo = {
        text: todoInput.value,
    };
    //   clears input
    todoInput.value = "";
    axios({
        url: "/todos",
        method: "POST",
        data: newTodo,
    })
        .then(function (response) {
        getTodos();
    })
        .catch(function (error) {
        console.log(error, "Error in posting todos");
    });
}
//put route
function completeTodo(event) {
    console.log("finishing that task");
    var todo = event.target;
    axios({
        url: "/todos/".concat(todo.id),
        method: "PUT",
    })
        .then(function (response) {
        getTodos();
    })
        .catch(function (error) {
        console.log(error, "Error in completing todo");
    });
}
//delete route
function deleteButton(event) {
    console.log('trying to delete');
    var todo = event.target;
    axios({
        method: 'DELETE',
        url: "/todos/".concat(todo.id)
    }).then(function (response) {
        getTodos();
    }).catch(function (error) {
        console.log('delete /todos/:id fail', error);
    });
}
getTodos();
