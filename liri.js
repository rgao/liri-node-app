require("dotenv").config();

var moment = require("moment");
var request = require("request");
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: "a726ed5ef45346b184714406e6ee4ffc",
    secret: "8b6801a7ed2742a3b08ada7ae8a7ede4"
});

if (process.argv[2] === "concert-this") {
    var queryURL = "https://rest.bandsintown.com/artists/" + process.argv[3] + "/events?app_id=codingbootcamp";
    request(queryURL, function (error, response, body) {

        if (!error & response.statusCode === 200) {
            var result = JSON.parse(body);

            for (i = 0; i < result.length; i++) {
                console.log("Venue name and location:", result[i].venue);
                console.log("Date: " + moment(result[i].datetime).format('MM-DD-YYYY'));
            }
        }
    })
}

//differences in syntax from above?
if (process.argv[2] === "spotify-this") {
    var queryURL = 'https://api.spotify.com/v1/' + process.argv[3] + spotify.id;
    spotify.request(queryURL)
    .then(function (data) {
        console.log(data);
    })
    .catch(function (err) {
        console.error('Error occurred: ' + err);
    })
}

if (process.argv[2] === "movie-this") {
    var queryURL = "http://www.omdbapi.com/?t=" + process.argv[3] + "&y=&plot=short&apikey=trilogy";
    request(queryURL, function(error, response, body) {

  if (!error && response.statusCode === 200) {

    console.log("Release Year: " + JSON.parse(body).Year);
  }
});
}