var express = require('express');
var app = express();

var bodyParser =require('body-parser');
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('Todo API Root');
});


app.get('/todos', function(req, res){
	//converting array to json format
	res.json(todos);
	//res.send(JSON.stringify(todos));
});

//get todos by id
app.get('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo;

	todos.forEach(function(todo){
		if(todoId === todo.id){
			matchedTodo =  todo;
		}
	});

	if(matchedTodo){
		res.json(matchedTodo);
	} else{
		res.status(404).send();
	}
});

//POST /todos
app.post('/todos', function(req, res){
	var body =req.body;

	//add id field
	body.id = todoNextId++;

	//push body into array
	todos.push(body);


	res.json(body);
});


app.listen(PORT, function(){
	console.log('Express listening on port ' + PORT + '!');
});
