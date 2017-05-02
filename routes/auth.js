var express    = require("express"),
    router     = express.Router(),
    passport   = require("passport"),
    Campground = require("../models/campground"),
    Comment    = require("../models/comment"),
    User       = require("../models/user");


// root route

router.get("/", function(req, res) {
    res.render("landing");
});

// register form

router.get("/register", function(req, res) {
    res.render("register");
});

// register create

router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            res.redirect("register");
        } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to YelpCamp, " + user.username);
                res.redirect("/campgrounds");
            });
        }
    });
});

// show login form

router.get("/login", function(req, res) {
    res.render("login", {message: req.flash("error")});
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {
});

// logout route

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You've been logged out.")
    res.redirect("/campgrounds");
});


module.exports = router;