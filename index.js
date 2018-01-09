/*

UK Geocoding with Node JS
Simple demo which passes postcode to the API and returns latitude and longitude.

Full geocoding API documentation:-
https://developers.alliescomputing.com/postcoder-web-api/geocoding/position

*/

// Using a simplified HTTP client from NPM - https://github.com/request/request
var request = require('request');

// Going to grab the arg from the command line arguments for this example
var postcode = process.argv[2] || "";
    
// Replace with your API key, test key will always return latitude and longitude for "NR14 7PZ"
var api_key = "PCW45-12345-12345-1234X";

// Grab the input text and trim any whitespace
postcode = postcode.trim() || "";

// Create an empty output object
var output = new Object;

if (postcode == "") {

    // Respond without calling API if no postcode supplied
    output.valid = false;
    output.message = "No postcode supplied";

    console.log(output);

} else {

    // Create the URL to API including API key and encoded postcode
    var geocoding_url = "https://ws.postcoder.com/pcw/" + api_key + "/position/uk/" + encodeURIComponent(postcode);

    // Call the API
    request(geocoding_url, function (error, response, body) {

        if (!error && response.statusCode == 200) {

            // Convert response into a JSON object
            var geocoding_response = JSON.parse(body);
            
            if(data.length > 0) {
                
                output.latitude = geocoding_response[0].latitude;
                output.longitude = geocoding_response[0].longitude;
                
            } else {
                
                output.error = "Postcode not found";
                
            }
            
            // OS Grid Easting and Northings also available
            // https://developers.alliescomputing.com/postcoder-web-api/geocoding/position

            console.log(output);

        } else {

            output.message = "An error occurred" + response.statusCode;

            console.log(output);

            // Triggered if API does not return HTTP code between 200 and 399
            // More info - https://developers.alliescomputing.com/postcoder-web-api/error-handling

        }

    });

}
