var express = require('express');
var config = require('./config.json');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const PORT = 5000;
const corsProxy = "https://cors-anywhere.herokuapp.com/";

// Set up the express app
const app = express();

// add alias route
app.get('/add/', (req, res) => {
  console.log("Add request recieved from: "+req.ip);
  var realEmail = req.query.realEmail;
  var alias = req.query.alias;
  var xhttp = new XMLHttpRequest();

  if(alias && realEmail){
    try {
      xhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               if(this.responseText.includes("Alias created")){
                 res.status(200).send({
                   success: 'true',
                   message: 'Alias has been created.',
                 });
               }else if(this.responseText.includes("You can only define the same source once per domain")){
                 res.status(200).send({
                   success: 'false',
                   message: 'Error: Duplicate alias request refused.',
                 });
               }else{
                 res.status(200).send({
                   success: 'false',
                   message: 'Error: Unknown API response (1).',
                 });
                 console.log("Error: Unknown API response (1). Response: => "+this.responseText);
               }
           }else if (this.readyState == 4){
             res.status(200).send({
               success: 'false',
               message: 'Error: Unknown API response (2).',
             });
             console.log("Error: Unknown API response (2). Response: => "+this.responseText);
          }
        };
        xhttp.open("POST", corsProxy.concat("https://forwardmx.io/api/alias/create?"+
        "&key="+config.apiKey+
        "&domain=pseudoname.io"+
        "&destination="+realEmail+
        "&alias="+alias), true);
        xhttp.setRequestHeader("x-requested-with", "pseudoname.io");
        console.log("The following external API was called (via the CORS Proxy): https://forwardmx.io/api/alias/create?&key="+config.apiKey+"&domain=pseudoname.io&destination="+realEmail+"&alias="+alias);
        xhttp.send();
      }catch(error) {
        res.status(500).send({
          success: 'false',
          message: 'Error: Unknown server error.',
        });
        console.error(error);
      }
  }else{
    res.status(422).send({
      success: 'false',
      message: 'Error: Missing required params. Please ensure that an alias and realEmail are provided.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}.\nConfiguration:`);
  console.log(JSON.stringify(config, null, -1));
});
