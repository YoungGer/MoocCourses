var express = require('express');

// add
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var Promotions = require('../models/promotions');
var Verify    = require('./verify');
// add

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req,res,next){
        //res.end('Will send all the promotions to you!');
    Promotions.find({}, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.post(Verify.verifyAdmin,function(req, res, next){
    //res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);    
    Promotions.create(req.body, function (err, dish) {
        if (err) throw err;
        console.log('Dish created!');
        var id = dish._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the dish with id: ' + id);
    });
})

.delete(Verify.verifyAdmin,function(req, res, next){
        //res.end('Deleting all promotions');
        Promotions.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

promoRouter.route('/:promoId')
.get(Verify.verifyOrdinaryUser, function(req,res,next){
        //res.end('Will send details of the promotion: ' + req.params.promoId +' to you!');
        Promotions.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.put(Verify.verifyAdmin,function(req, res, next){
    //     res.write('Updating the promotion: ' + req.params.promoId + '\n');
    // res.end('Will update the promotion: ' + req.body.name + 
    //         ' with details: ' + req.body.description);
    Promotions.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, {
        new: true
    }, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.delete(Verify.verifyAdmin,function(req, res, next){
        // res.end('Deleting promotion: ' + req.params.promoId);
        Promotions.findByIdAndRemove(req.params.dishId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});


module.exports = promoRouter;
