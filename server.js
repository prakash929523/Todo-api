var express = require('express');
var app = express();

var _ = require('underscore');
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
	var matchedTodo = _.findWhere(todos, {id: todoId});
		//(or)
	// var matchedTodo;

	// todos.forEach(function(todo){
	// 	if(todoId === todo.id){
	// 		matchedTodo =  todo;
	// 	}
	// });

	if(matchedTodo){
		res.json(matchedTodo);
	} else{
		res.status(404).send();
	}
});

//POST /todos
app.post('/todos', function(req, res){
	var body = _.pick(req.body, 'description', 'completed');  

	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
		return res.status(400).send();
	}

	body.description =body.description.trim();
	body.id = todoNextId++;

	todos.push(body);


	res.json(body);
});


//Delete http method /todos/:id
app.delete('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId}); 

	if(!matchedTodo){
		res.status(404).json({"error" : "no todo found with that id"});
	}else{
		todos = _.without(todos, matchedTodo);
		res.json(matchedTodo);
	}

});

app.listen(PORT, function(){
	console.log('Express listening on port ' + PORT + '!');
});
