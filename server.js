var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id : 1,
	description : 'Meet mom for lunch',
	completed : false
},{
	id : 2,
	description : 'Go to market',
	completed : false
},{
	id : 3,
	description : 'feed the cat',
	completed : true
}];

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
	

	//iterate of todos array. find the match.


	res.send('asking for todos with id of ' + req.params.id)
});




app.listen(PORT, function(){
	console.log('Express listening on port ' + PORT + '!');
});
