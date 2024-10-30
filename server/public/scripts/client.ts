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