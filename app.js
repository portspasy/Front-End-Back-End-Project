var express = require("express"); // to require the express framework
var app = express(); // to use the express, can use only express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Connect Mongoose to a Mongodb Database
mongoose.connect("mongodb://localhost:27017/camp_app", {useNewUrlParser: true});


// Mongoose Schema Setup
var campgroundSchema = new mongoose.Schema({ 
    name: String,
    image: String,
    description: String
}); 

// Create a Mongoose model
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Test Here Nr.2", image:"https://www.tourismsaskatchewan.com/~/media/saskparks/header-images/camping.jpg",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem a harum praesentium quod provident enim quaerat id, eius placeat perspiciatis illum, dicta est veritatis nesciunt, vel deserunt cupiditate laboriosam ad?"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("New Campground created!");
//             console.log(campground);
//         } 
//     }
// );


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// var campgrounds = [
//     {name: "Test Here Nr.1", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKrfS4lGI30moED-_20F4JboZF1Imw3ilQ9ShW7hoMTjeJLm0zyQ"},
//     {name: "Test Here Nr.2", image:"https://www.tourismsaskatchewan.com/~/media/saskparks/header-images/camping.jpg"},
//     {name: "Test Here Nr.3", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKrfS4lGI30moED-_20F4JboZF1Imw3ilQ9ShW7hoMTjeJLm0zyQ"},
//     {name: "Test Here Nr.4", image:"https://www.tourismsaskatchewan.com/~/media/saskparks/header-images/camping.jpg"},
//     {name: "Test Here Nr.5", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKrfS4lGI30moED-_20F4JboZF1Imw3ilQ9ShW7hoMTjeJLm0zyQ"},
//     {name: "Test Here Nr.6", image:"https://www.tourismsaskatchewan.com/~/media/saskparks/header-images/camping.jpg"},
//     {name: "Test Here Nr.7", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKrfS4lGI30moED-_20F4JboZF1Imw3ilQ9ShW7hoMTjeJLm0zyQ"},
//     {name: "Test Here Nr.8", image:"https://www.tourismsaskatchewan.com/~/media/saskparks/header-images/camping.jpg"},
//     {name: "Test Here Nr.9", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKrfS4lGI30moED-_20F4JboZF1Imw3ilQ9ShW7hoMTjeJLm0zyQ"},
//     {name: "Test Here Nr.10", image:"https://www.tourismsaskatchewan.com/~/media/saskparks/header-images/camping.jpg"},
//     {name: "Test Here Nr.11", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKrfS4lGI30moED-_20F4JboZF1Imw3ilQ9ShW7hoMTjeJLm0zyQ"},
//     {name: "Test Here Nr.12", image:"https://www.tourismsaskatchewan.com/~/media/saskparks/header-images/camping.jpg"},
// ];

app.get("/", function(req, res){ // Root path of Landing Page
    res.render("landing");
});

app.get("/campgrounds", function(req, res){ // Root path of Landing Page
//    res.render("campgrounds", {campgrounds: campgrounds});
   Campground.find({},  function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});


app.post("/campgrounds", function(req, res){
   // get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image}
   // Create a new campground and sate to DB 
   Campground.create(newCampground, function(err, newCreated){
        if(err){
            console.log(err); // Console log error or add smth to form!
        } else {
            res.redirect("/campgrounds"); // Redirect to Campgrounds page
        }
    });
//    campgrounds.push(newCampground);
   // Create a new campground and save to Database
   Campground.create(newCampground, function(err, newlyCreated) {
        if(err){
            console.log(err);

        } else {
            // rederect back to campgrounds page
            res.redirect("/campgrounds");
        }
   });
   // rederect back to campgrounds page
//    res.redirect("/campgrounds");

});

// this must be declare before the /:id  !!!
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

// shows more info about one campground 
app.get("/campgrounds/:id", function(req, res){ // for example /campgrounds/test123
    // find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err){
            console.log(err);

        } else {
            // rederect show template with that campground 
            res.render("shows", {campgrounds: foundCampground});
        }
    });
});


app.listen(3130, function(){ //run te server at the port 3130
    console.log("Project Server has started at port 3130!!");
});