const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");





app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    
});

app.post("/", function(req, res){
    console.log("post recieved");

    const query = req.body.cityName;
    const apiKey = "90aad6461141b5f132db7b079ff1eb64";
    const unit = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response){
    console.log(response.statusCode);
    console.log(response.statusMessage);

    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        console.log(weatherData.weather[0].icon);
        // console.log(weatherData);
        const icon = weatherData.weather[0].icon;
        const imgURL = 'http://openweathermap.org/img/wn/'+ icon +'@2x.png';
        console.log(temp + " Farenheight");
        console.log(description);
        res.type("html");
        res.write("<p>The weather is currently " + description + ".</p>")
        res.write("<h1>The temperature in "+ query +" is " + temp + " degrees Farenheight.</h1>");
        res.write('<img src="' + imgURL + '">');
        res.send();
    });
});

});




app.listen(3000, function(){
    console.log("Server running on port 3000");
});