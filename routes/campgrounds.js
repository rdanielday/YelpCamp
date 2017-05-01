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

router.post("/", isLoggedIn, function(req, res) {
   // get data from form and add to campgrounds DB
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {id: req.user._id, username: req.user.username};
   var newCampground = { name: name, image: image, description: desc, author: author };
   // create a new campground and save to database
   Campground.create(newCampground, function(err, newlyCreated){
       if (err) {
           console.log(err);
       } else {
           console.log(newlyCreated)
           res.redirect("/campgrounds");
       }
   });
});

// NEW - show form to create new campground

router.get("/new", isLoggedIn, function(req, res) {
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

// edit campground route

router.get("/:id/edit", function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

// update campground route

router.put("/:id", function(req, res) {
    // find and update correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            res.redirect("/campground");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// destroy campground route

router.delete("/:id", function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
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