var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/cat_app");

var catSchema = mongoose.Schema({ 
    name: String ,
    age: Number,
    temperament: String
}); 

var Cat = mongoose.model("Cat", catSchema);

var Geroge = new Cat({
    name: "George",
    age: 11,
    temperament: "Shy"
})

Geroge.save(function(err, cat) {
    if(err){
        console.log("Something went wrong!");
    } else {
        console.log("We just saved a cat to the database");
        console.log(cat);
    }
});

Cat.create({
    name: "Lucy",
    age: 5,
    temperament: "Lovely"
});

Cat.find({}, function(err, cats){
    if(err){
        console.log("Oh no, error!");
        console.log(err);
    } else {
        console.log("All the cats...");
        console.log(cats);
    }
});