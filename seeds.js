var mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment");
    
var data = [
        {
            name: "Goat's Gruff",
            image: "https://farm7.staticflickr.com/6082/6142484013_74e3f473b9.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." + 
                         "Donec at massa arcu. Curabitur ipsum mauris, tristique" + 
                         "vitae est pretium, ornare maximus tortor. Ut imperdiet," +
                         "nisl quis maximus tempor, orci est tempor nisi, sit" +
                         "amet cursus velit odio at neque. Ut at orci erat. Vivamus" +
                         "a odio sit amet est placerat tincidunt. Curabitur eu" +
                         "nunc ut nulla semper fringilla. Fusce porta, erat non" +
                         "gravida tempus, elit libero imperdiet leo, eget rutrum" +
                         "tortor purus in elit. Donec ac semper ligula. Quisque" +
                         "eget finibus elit. Nulla mattis ante sit amet lobortis" +
                         "ultrices. Nam non ante varius, suscipit enim nec," +
                         "viverra risus. Nam consequat vehicula finibus. Aenean" +
                         "vitae purus gravida, scelerisque felis nec, commodo ante." +
                         "Mauris a dignissim lacus, dapibus facilisis purus."
        },
        {
            name: "Bob's Hole",
            image: "https://farm4.staticflickr.com/3191/3061337059_36c9457ab6.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." + 
                         "Donec at massa arcu. Curabitur ipsum mauris, tristique" + 
                         "vitae est pretium, ornare maximus tortor. Ut imperdiet," +
                         "nisl quis maximus tempor, orci est tempor nisi, sit" +
                         "amet cursus velit odio at neque. Ut at orci erat. Vivamus" +
                         "a odio sit amet est placerat tincidunt. Curabitur eu" +
                         "nunc ut nulla semper fringilla. Fusce porta, erat non" +
                         "gravida tempus, elit libero imperdiet leo, eget rutrum" +
                         "tortor purus in elit. Donec ac semper ligula. Quisque" +
                         "eget finibus elit. Nulla mattis ante sit amet lobortis" +
                         "ultrices. Nam non ante varius, suscipit enim nec," +
                         "viverra risus. Nam consequat vehicula finibus. Aenean" +
                         "vitae purus gravida, scelerisque felis nec, commodo ante." +
                         "Mauris a dignissim lacus, dapibus facilisis purus."
        },
        {
            name: "Black Bear's Feast",
            image: "https://farm4.staticflickr.com/3189/3062178880_4edc3b60d5.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." + 
                         "Donec at massa arcu. Curabitur ipsum mauris, tristique" + 
                         "vitae est pretium, ornare maximus tortor. Ut imperdiet," +
                         "nisl quis maximus tempor, orci est tempor nisi, sit" +
                         "amet cursus velit odio at neque. Ut at orci erat. Vivamus" +
                         "a odio sit amet est placerat tincidunt. Curabitur eu" +
                         "nunc ut nulla semper fringilla. Fusce porta, erat non" +
                         "gravida tempus, elit libero imperdiet leo, eget rutrum" +
                         "tortor purus in elit. Donec ac semper ligula. Quisque" +
                         "eget finibus elit. Nulla mattis ante sit amet lobortis" +
                         "ultrices. Nam non ante varius, suscipit enim nec," +
                         "viverra risus. Nam consequat vehicula finibus. Aenean" +
                         "vitae purus gravida, scelerisque felis nec, commodo ante." +
                         "Mauris a dignissim lacus, dapibus facilisis purus."
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

