require("dotenv").config();

var moment = require("moment");
var request = require("request");
// var spotify = new Spotify(keys.spotify);

if (process.argv[2] === "concert-this") {
    request("https://rest.bandsintown.com/artists/" + process.argv[3] + "/events?app_id=codingbootcamp", function(error, response, body) {

        if (!error & response.statusCode === 200) {
            var result = JSON.parse(body);

            for (i = 0; i < result.length; i++) {
                console.log("Venue name and location:")
                console.log(result[i].venue);
                console.log("Date: " + moment(result[i].datetime).format('MM-DD-YYYY'));
            }
        }
    })
}