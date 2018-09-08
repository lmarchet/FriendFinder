// Links "data" source, in this case is the array stored in friends.js file

var userInformation = require("../app/data/friends");

// routing for express
module.exports = function (app) {
    // api get request route
    app.get("/api/friends", function (req, res) {
        res.json(userInformation);
    });

    var comparisonUserTotalScore = 0;

    var friendScores = [];

    /* api POST REQUEST:
    - When a user submits form data (a JSON object) the JSON is pushed to the appropriate JavaScript array
    - this data is then sent to the server
    - Then the server saves the data to the friends array)
    */

    app.post("/api/friends", function (req, res) {

        // var userResponse = req.body;

        // userInformation.push(userResponse);

        // Store current user scores in array.
        var currentUserScores = req.body.scores;

        console.log("Current user scores: " + currentUserScores);

        // Determine the user's most compatible friend.
        for (var i = 0; i < userInformation.length; i++) {

            // Convert each user's results in to an array of numbers.
            var comparisonUserScores = userInformation[i].scores;

            // Find total difference between current user and each user.
            comparisonUserTotalScore = calculateUserCompatibilityScore(currentUserScores, comparisonUserScores);

            // Build up array of user compatibility scores.
            friendScores.push(comparisonUserTotalScore);

        }

        console.log("Array of friend scores: " + friendScores);

        var index = 0;
        var value = friendScores[0];

        for (var i = 0; i < friendScores.length; i++) {
            console.log("Value of item in array: " + friendScores[i]);
            if (friendScores[i] < value) {
                value = friendScores[i];
                index = i;
            }
        }

        console.log("Best friend name: " + userInformation[index].name);

        res.send(userInformation[index]);


        userInformation.push(req.body);

    });
};

var totalDifference = 0;

// Find total difference between current user and another user.
function calculateUserCompatibilityScore(currentUserScores, comparisonUserScores) {

    // Reset the total difference counter each time function called.
    totalDifference = 0;

    for (var i = 0; i < currentUserScores.length; i++) {

        totalDifference += Math.abs(currentUserScores[i] - comparisonUserScores[i]);
    }

    console.log("Final total difference for friend: " + totalDifference);

    return totalDifference;
};