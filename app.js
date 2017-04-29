var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose"),
    Campground   = require("./models/campground"),
    Comment      = require("./models/comment"),
    User         = require("./models/user");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");




// Campground.create({
//     name: "Granite Hill",
//     image: "https://farm4.staticflickr.com/3189/3062178880_4edc3b60d5.jpg",
//     description: "A serene overlook offering a lake view and all of the privacy you could ever need!"
// }, function (err, campground){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Newly created campground: ")
//         console.log(campground);
//     }
// });

// ***************** //
// ROUTE DEFINITIONS //
// ***************** //

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds:allCampgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res) {
    
   // get data from form and add to campgrounds DB
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = { name: name, image: image, description: desc };
   
   // create a new campground and save to database
   Campground.create(newCampground, function(err, newlyCreated){
       if (err) {
           console.log(err);
       } else {
           res.redirect("/campgrounds");
       }
   });
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new") 
});

app.get("/campgrounds/:id", function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
       if (err) {
           console.log(err);
       } else {
         res.render("show", {campground: foundCampground});  
       }
    });
});



// **************** //
// SET SERVER PORTS //
// **************** //

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server has started!")
});