var mongoose = require('mongoose'),
    assert = require('assert');

var Promotions = require('./models/promotions');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new user
    var newPromotion = Promotions( {
      "name": "Weekend Grand Buffet",
      "image": "images/buffet.png",
      "label": "New",
      "price": "19.99",
      "description": "Featuring . . ."
    });

    // save the user
    newPromotion.save(function (err) {
        if (err) throw err;
        console.log('Promotion created!');

        // get all the users
        Promotions.find({}, function (err, promotions) {
            if (err) throw err;

            // object of all the users
            console.log(promotions);
                        db.collection('promotions').drop(function () {
                db.close();
            });
        });
    });
});