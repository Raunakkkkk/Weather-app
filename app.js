const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    // get mtlb broser req kr rha ye html 
// res.send("Server is up and running");
res.sendFile(__dirname+"/index.html");


});
app.post("/",function(req,res){
console.log("post received");
const query=req.body.location;

const apikey="0b3260648306022ec91cc5d86c76e9e7";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey;
https.get(url,function(response){
    // making get request to external server
console.log(response.statusCode);



response.on("data",function(data){
const weatherData=JSON.parse(data);

const temp=weatherData.main.temp-273;
const cloud_des=weatherData.weather[0].description;
const icon=weatherData.weather[0].icon;
const iconurl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
res.write("<h1> The temperature is currently "+temp+" degree celcius in "+ query+"</h1>");
res.write("<h2> The weather is currently "+cloud_des+"</h2>");
res.write("<img src="+iconurl+">");
res.send();

// console.log(temp+" "+cloud_des);
// console.log(weatherData); isse pura hi ajara

});

});

});




app.listen(3000,function(){
console.log("server started");

})