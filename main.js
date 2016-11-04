var redis = require('redis')
var express = require('express')
var fs      = require('fs')
var path = require('path')
var jsdom = require('node-jsdom')
var app = express()

/////////////////////////////////////////////////////////////////
// REDIS - sample
var client = redis.createClient(6379, '127.0.0.1', {});
client.set("R1P1", "All about Elon Musk's journey of Tesla.");
client.get("R1P1", function(err,value){ console.log(value)});

// function to set all values

/////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////
// function to get values
function redis_get(userkey) {
	// gets the value
	client.get(userkey, function(err,value){ 
		if(value)
		{
			console.log("Value exists:", value);
		}
			
		else
		{
			console.log("Value expired.");
		}	
		return value;
	});
}
/////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////
// SIMPLE HTTP WEB SERVER
var server = app.listen(process.argv[2], function () {

   var host = server.address().address;
   var port = server.address().port;

   console.log('Example app listening at http://%s:%s', host, port);
 })


// sample web page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
})

// web page rendered according to user's input
app.get('/:selection', function(req, res) {
	var selection = req.params.selection;

	client.get(selection, function(err,value){ 
		if(value)
		{
			console.log("Value exists:", value);
			//res.send("Value exists : "+value+'<br><i>[Request served at '+process.argv[2]+']</i></br>');

			// web page modified 
			fs.readFile('/usr/bin/index.html', 'utf8', function(error, data) {
			    jsdom.env(data, [], function (errors, window) {
			        var $ = require('jquery')(window);
			        $("p").each(function () {
			            var content = $(this).text();
			            $(this).text(content + " modified!");
			        });

			        fs.writeFile('/usr/bin/out.html', window.document.documentElement.outerHTML,
			                     function (error){
			            if (error) throw error;
			        });
			    });
			});
		}
			
		else
		{
			console.log("Value expired.");
			res.send("");
		}
	});
    
})


/////////////////////////////////////////////////////////////////