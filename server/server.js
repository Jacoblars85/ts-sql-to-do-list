var express = require('express');
var app = express();
var todos = require('./routes/todos.router.js');
var PORT = process.env.PORT || 5001;
app.use(express.static('./server/public'));
app.use(express.json());
app.use('/todos', todos);
app.listen(PORT, function () {
    console.log('server running on: ', PORT);
});
