var express    = require("express"),
    router     = express.Router(),
    Campground = require("../models/campground"),
    Comment    = require("../models/comment"),
    User       = require("../models/user"),
    middleware = require("../middleware"),
    geocoder   = require("geocoder");
    

// INDEX - show all campgrounds

router.get("/", function(req, res) {
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds, page: "campgrounds"});
        }
    });
});

// CREATE - add new campground to DB

router.post("/", middleware.isLoggedIn, function(req, res) {
   // get data from form and add to campgrounds DB
   var name = req.body.name;
   var image = req.body.image;
   var price = req.body.price;
   var desc = req.body.description;
   var author = {
       id: req.user._id, 
       username: req.user.username
       
   };
   geocoder.geocode(req.body.location, function (err, data) {
       var lat = data.results[0].geometry.location.lat;
       var lng = data.results[0].geometry.location.lng;
       var location = data.results[0].formatted_address;
       var newCampground = { name: name, price: price, image: image, description: desc, author: author, location: location, lat: lat, lng: lng };
       // create a new campground and save to database
       Campground.create(newCampground, function(err, newlyCreated){
           if (err) {
               console.log(err);
           } else {
               console.log(newlyCreated);
               res.redirect("/campgrounds");
           }
       });
   });
});

// NEW - show form to create new campground

router.get("/new", middleware.isLoggedIn, function(req, res) {
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

router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// update campground route

router.put("/:id", function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.name, image: req.body.image, description: req.body.description, price: req.body.price, location: location, lat: lat, lng: lng};
    Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
  });
});

// destroy campground route

router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground deleted.")
            res.redirect("/campgrounds");
        }
    });
});




module.exports = router;