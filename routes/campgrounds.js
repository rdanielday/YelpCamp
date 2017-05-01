var express    = require("express"),
    router     = express.Router(),
    Campground = require("../models/campground"),
    Comment    = require("../models/comment"),
    User       = require("../models/user");
    

// INDEX - show all campgrounds

router.get("/", function(req, res) {
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
});

// CREATE - add new campground to DB

router.post("/", function(req, res) {
    
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

// NEW - show form to create new campground

router.get("/new", function(req, res) {
   res.render("campgrounds/new");
});

// SHOW - shows more info about one campground

router.get("/:id", function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if (err) {
           console.log(err);
       } else {
            res.render("campgrounds/show", {campground: foundCampground});  
       }
    });
});

// middleware

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

module.exports = router;