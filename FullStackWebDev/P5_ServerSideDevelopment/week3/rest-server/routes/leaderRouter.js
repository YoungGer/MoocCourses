var express = require('express');

// add
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var Leaders = require('../models/leadership');
// add

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get(function(req,res,next){
        // res.end('Will send all the leaders to you!');
        Leaders.find({}, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.post(function(req, res, next){
    // res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);    
    Leaders.create(req.body, function (err, dish) {
        if (err) throw err;
        console.log('Dish created!');
        var id = dish._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the dish with id: ' + id);
    });
})

.delete(function(req, res, next){
        // res.end('Deleting all leaders');
        Leaders.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

leaderRouter.route('/:leaderId')
.get(function(req,res,next){
        // res.end('Will send details of the leader: ' + req.params.leaderId +' to you!');
        Leaders.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.put(function(req, res, next){
    //     res.write('Updating the leader: ' + req.params.leaderId + '\n');
    // res.end('Will update the leader: ' + req.body.name + 
    //         ' with details: ' + req.body.description);
    Leaders.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, {
        new: true
    }, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.delete(function(req, res, next){
        // res.end('Deleting leader: ' + req.params.leaderId);
        Leaders.findByIdAndRemove(req.params.dishId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});


module.exports = leaderRouter;
