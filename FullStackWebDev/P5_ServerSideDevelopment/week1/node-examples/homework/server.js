var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

//add dishes router
var rout = require('./dishRouter')
var dishRouter = rout.dishRouter()
app.use('/dishes',dishRouter);
//add promotions router
var rout2 = require('./promoRouter')
var promoRouter = rout2.promoRouter()
app.use('/promotions',promoRouter);
//add promotions router
var rout3 = require('./leaderRouter')
var leaderRouter = rout3.leaderRouter()
app.use('/leadership',leaderRouter);



app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});