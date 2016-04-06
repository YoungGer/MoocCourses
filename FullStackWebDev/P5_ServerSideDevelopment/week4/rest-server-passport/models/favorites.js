// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var favoritesSchema = new Schema({
    dishes:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dish'
        }],
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Favorites  = mongoose.model('Favorite', favoriteSchema);

// make this available to our Node applications
module.exports = Favorites ;