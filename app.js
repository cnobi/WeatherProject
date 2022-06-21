const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res) {

    const city = req.body.cityName;
    const appid = "53aa6bbea94e04e335c63bf6d0975ef0";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + appid + "&q=" + city + "&units=" + unit;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
             const weatherData = JSON.parse(data);
             const temp = weatherData.main.temp;
             const icon = weatherData.weather[0].icon;
             const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

             const description = weatherData.weather[0].description;

             res.setHeader("Content-Type", "text/html");
             res.write("<h1>Solti! " + city + "'s temperature: " + temp + " degrees Celcius.</h1>");
             res.write("<h3>Currently there is " + description + "</h3>");
             res.write("<img src=" + imageURL + ">");
             res.send();
        });
    });
    

});




app.listen(3000, function(){
    console.log("Server started at Port 3000 Successfully!");
});