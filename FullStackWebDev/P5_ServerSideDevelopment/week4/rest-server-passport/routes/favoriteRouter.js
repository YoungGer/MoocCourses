var express = require('express');

// add
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var Favorites = require('../models/favorites');
var Verify    = require('./verify');
// add

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());


favoriteRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
        //res.end('Will send all the dishes to you!');
        Favorites.find({})
        .populate('postedBy')
        .populate('dishes.postedBy')
        .populate('dishes.comments.postedBy')
        .exec(function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.post(Verify.verifyAdmin, function (req, res, next) {
    //res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);    
    Favorites.create(req.body, function (err, dish) {
        if (err) throw err;
        console.log('Dish created!');
        var id = dish._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the favorite dish with id: ' + id);
    });
})

.delete(Verify.verifyAdmin, function (req, res, next) {
        //res.end('Deleting all dishes');
        Favorites.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

favoriteRouter.route('/:dishId')
// .get(Verify.verifyOrdinaryUser, function (req, res, next) {
//     Dishes.findById(req.params.dishId)
//         .populate('comments.postedBy')
//         .exec(function (err, dish) {
//         if (err) throw err;
//         res.json(dish);
//     });
// })

// .put(Verify.verifyAdmin,function(req, res, next){
//     //res.write('Updating the dish: ' + req.params.dishId + '\n');
//     //res.end('Will update the dish: ' + req.body.name + 
//     //       ' with details: ' + req.body.description);
//     Dishes.findByIdAndUpdate(req.params.dishId, {
//         $set: req.body
//     }, {
//         new: true
//     }, function (err, dish) {
//         if (err) throw err;
//         res.json(dish);
//     });
// })
.delete(Verify.verifyAdmin,function(req, res, next){
        //res.end('Deleting dish: ' + req.params.dishId);
    Favorites.findByIdAndRemove(req.params.dishId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});

module.exports = favoriteRouter;
