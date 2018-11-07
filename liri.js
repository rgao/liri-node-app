require("dotenv").config();
var fs = require("fs");

var moment = require("moment");
var request = require("request");
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: "a726ed5ef45346b184714406e6ee4ffc",
    secret: "8b6801a7ed2742a3b08ada7ae8a7ede4"
});

function doThis(input1, input2) {
    console.log(input1, input2)
    if (input1 === "concert-this") {
        concertQuery(input2);
    } else if (input1 === "spotify-this-song") {
        songQuery(input2);
    } else if (input1 === "movie-this") {
        movieQuery(input2);
    } else if (input1 === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function (error, data) {

            if (error) {
                return console.log(error);
            }
    
            var parsed = data.split(",");
            doThis(parsed[0], parsed[1]);
        });
    } else {
        return console.log("Please submit valid inputs.");
    }
}

function concertQuery(concert) {
    var queryURL = "https://rest.bandsintown.com/artists/" + concert + "/events?app_id=codingbootcamp";
    request(queryURL, function (error, response, body) {

        if (!error & response.statusCode === 200) {
            var result = JSON.parse(body);

            for (i = 0; i < result.length; i++) {
                console.log("-----------------------------------------------------------");
                console.log("Venue name and location:", result[i].venue);
                console.log("Date: " + moment(result[i].datetime).format('MM-DD-YYYY'));
            }
        } else {
            return console.log(error);
        }
    })
}

function songQuery(song) {
    spotify
        .search({ type: 'track', query: song, limit: 1 })

        .then(function (response) {
            var album = response.tracks.items[0];
            var allArtists = [];
            for (i = 0; i < album.artists.length; i++) {
                allArtists.push(album.artists[i].name);
            }

            var info = ["Artists(s): " + allArtists, "Song: " + album.name,
            "Link: " + album.external_urls.spotify, "Album: " + album.album.name].join("\n");
            console.log("-----------------------------------------------------------");
            console.log(info);
        })
        .catch(function (err) {
            return console.log(err);
        });
}


function movieQuery(movie) {
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    request(queryURL, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var parsed = JSON.parse(body);
            var info = ["Title: " + parsed.Title, "Year: " + parsed.Year, "Ratings(IMDB): " + parsed.Ratings[0].Value,
            "Ratings(Tomatoes): " + parsed.Ratings[1].Value, "Country: " + parsed.Country, "Language: " + parsed.Language,
            "Plot: " + parsed.Plot, "Actors: " + parsed.Actors].join("\n");
            console.log("----------------------------------------------------------------------------");
            console.log(info);

        } else {
            return console.log(error);
        }
    });
}

doThis(process.argv[2], process.argv[3]);