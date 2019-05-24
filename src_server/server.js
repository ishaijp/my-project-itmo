var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 8080;


app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("build"));

var Users = require('../routes/Users');
var adds = require('../routes/adds');
var Comment = require('../models/Item');

app.use('/users', Users);
app.use('/adds', adds);

const getAllComments = async () => {
    return await Items.findAll();
};

adds.get('/adds',  function(req, res) {       
    getAllComments().then(adds => res.json(adds));
  }); 

app.listen(port, function() {
    console.log("Server is running on port: " + port);
})