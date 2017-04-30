var mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment");
    
var data = [
        {
            name: "Goat's Gruff",
            image: "https://farm7.staticflickr.com/6082/6142484013_74e3f473b9.jpg",
            description: "A beautiful pasture to pop your tent!"
        },
        {
            name: "Bob's Hole",
            image: "https://farm4.staticflickr.com/3191/3061337059_36c9457ab6.jpg",
            description: "What can we say? Bob's got a great hole."
        },
        {
            name: "Black Bear's Feast",
            image: "https://farm4.staticflickr.com/3189/3062178880_4edc3b60d5.jpg",
            description: "This site gets its name from a tragic event in 1963."
        }
    ]
    
function seedDB() {
   Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed all campgrounds");
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        // create a comment
                        Comment.create(
                            {
                                text: "The man with the chainsaw was exciting, to say the least.",
                                author: "Michael Meyers"
                            }, function(err, comment) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("added a comment");
                                    campground.comments.push(comment);
                                    campground.save();
                                }
                            });
                    }
                })
            });
        }
    });
}
    

module.exports = seedDB;

