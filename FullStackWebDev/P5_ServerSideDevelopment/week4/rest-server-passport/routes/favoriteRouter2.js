var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Favorites = require('../models/favorites');

var favoritesRouter = express.Router();
favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.find({'postedBy': req.decoded._doc._id})
        .populate('postedBy')
        .populate('dishes')
        .exec(function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    req.body.postedBy = req.decoded._doc._id;
    req.body.dishes = [];
    var dishId = req.body._id;
    req.body.dishes.push(dishId);
    delete req.body._id;

    Favorites.findOne({'postedBy': req.decoded._doc._id}, function (err, favorite){
      if(favorite == null){
        // create if not exists
        Favorites.create(req.body, function (err, favorite) {
          if (err) throw err;
          console.log('Fav created!');
          var id = favorite._id;
          res.json(favorite);
        })
      } else {
        var index_existing = favorite.dishes.indexOf(dishId);
        //add if not already added
        if(index_existing === -1){
            console.log("Adding new favorite");
            favorite.dishes.push(dishId);
            favorite.save(function (err, favorite) {
                if (err) throw err;
                console.log('Added Favorite!');
            });
        }else{
            console.log("Favorite already exist");
        }
        res.json(favorite);
    }
    
    })
    
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.findOneAndRemove({'postedBy': req.decoded._doc._id}, function (err, favorite){
      console.log('Removing  it all '+ favorite);
      res.json(favorite);
    })  
});

favoritesRouter.route('/:dishObjectId')

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.findOne({'postedBy': req.decoded._doc._id}, function (err, favorite){  
      if(favorite == null){
        console.log("Favorite dont exist");
      }else{
        var indexOfDish = favorite.dishes.indexOf(req.params.dishObjectId);
        if (indexOfDish != -1){ 
        favorite.dishes.splice(indexOfDish,1);

        favorite.save(function (err, favorite) {
                if (err) throw err;
                console.log('Favorite dishes remowed from list');
            });
        }else{
            console.log('Favorite to delete not found');
        }
      }
      res.json(favorite); 
    })
});



module.exports = favoritesRouter;