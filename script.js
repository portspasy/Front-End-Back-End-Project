var knockknockjokes = require('knock-knock-jokes');
var faker = require('faker');


// Loop Function
var greetings = "Hello There!";
for ( var i = 0; i < 6; i++ ) {
    console.log(greetings);
}


// Find Avarage Number Function
function avarage(scores) {
    var total = 0;
    scores.forEach(function(score){
        total += score;
    });
    var avg = total/scores.length;
    return Math.round(avg);
}

var scores = [90 , 98, 100, 120, 61, 15, 99, 86];
console.log(avarage(scores));



// Knock Knock Jokes
console.log(knockknockjokes());



// Faker Function Test
function fakerData(){
    for (var i = 0; i <= 10; i++) {
        console.log(faker.commerce.productName() + " - " + "$" + faker.commerce.price());
    }
}

console.log("========================");
console.log("WELCOME TO MY SHOP!");
console.log("========================");
       		
fakerData();