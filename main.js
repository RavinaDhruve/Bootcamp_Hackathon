var redis = require('redis')
var express = require('express')
var fs      = require('fs')
var path = require('path')
var jsdom = require('node-jsdom')
var jquery = require('jquery');
var app = express()

/////////////////////////////////////////////////////////////////
// REDIS - sample
var client = redis.createClient(6379, '127.0.0.1', {});
var para1 = "Elon Reeve Musk ( born June 28, 1971) is a South African-born Canadian-American business magnate, investor, engineer and inventor. He is the founder, CEO, and CTO of SpaceX; co-founder, CEO, and product architect of Tesla Motors; co-founder and chairman of SolarCity; co-chairman of OpenAI; co-founder of Zip2; and founder of X.com which merged with PayPal of Confinity. As of June 2016, he has an estimated net worth of US$11.5 billion, making him the 83rd wealthiest person in the world.";
client.set("get1", para1);
//client.get("P1", function(err,value){ console.log(value)});

var para2 = "Tesla Motors (often shortened to Tesla) is an American automaker and energy storage company co-founded by Martin Eberhard, Marc Tarpenning, JB Straubel, Elon Musk and Ian Wright, and is based in Palo Alto, California. The company specializes in electric cars and their powertrain components and also produces battery charging equipment. Tesla first gained widespread attention following its production of the Tesla Roadster, the first electric sports car, in 2008. The company's second vehicle, the Model S, an electric luxury sedan, debuted in 2012. In Q1 2013, Tesla released its stock profits for the first time from its NASDAQ ticker symbol. Global sales for the Model S passed 100K units in December 2015, three and a half years after its introduction, and it was the world's best-selling plug-in vehicle that year.";
client.set("get2", para2);
//client.get("P2", function(err,value){ console.log(value)});


var para3 = "Space Exploration Technologies Corporation, better known as SpaceX, is an American aerospace manufacturer and space transport services company headquartered in Hawthorne, California, United States. It was founded in 2002 by Tesla Motors CEO and former PayPal entrepreneur Elon Musk with the goal of creating the technologies to reduce space transportation costs and enable the colonization of Mars. It has developed the Falcon 1 and Falcon 9 launch vehicles, both designed to be reusable, and the Dragon spacecraft which is flown into orbit by the Falcon 9 launch vehicle to supply the International Space Station (ISS) with cargo. A manned version of Dragon is in development. SpaceX is funded by government subsidies and contracts with multiple entities." ;
client.set("get3", para3);
//client.get("P3", function(err,value){ console.log(value)});
/////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////
// SIMPLE HTTP WEB SERVER
var server = app.listen(process.argv[2], function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log('Elon Musk Ipsum app listening at http://%s:%s', host, port);
 })


// sample home web page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/elonmusk.html'));
})

// web page rendered according to user's input
app.get('/:selection', function(req, res) {
	var selection = req.params.selection;

	client.get(selection, function(err,value){ 
		if(value)
		{
			//console.log("Value exists:", value);
			fs.readFile('/usr/bin/elonmusk.html', 'utf8', function(error, data) {
			    jsdom.env(data, [], function (errors, window) {
			    	
			        var $ = require('jquery')(window);
			        $( "#Para" ).append( "<p>"+value+"</p>" );
			        fs.writeFile('/usr/bin/out.html', window.document.documentElement.outerHTML,
			                     function (error){
			            if (error) throw error;
			            res.sendFile('/usr/bin/out.html');
			        });
				});
			});
		}
			
		else
		{
			//console.log("Oops no data!");
			res.send("Oops no data!");
		}
	});   
})
/////////////////////////////////////////////////////////////////
