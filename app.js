var express = require("express");
var app = express();
var mongoose = require("mongoose")
var bodyParser = require("body-parser")
var port = 5000


//configuring body parser to convert the data from the body to .json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}))



//mongoose configuration
mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/node-demo")


mongoose.connect('mongodb://localhost:27017/node-demo', { useUnifiedTopology: true }  ,(err) => {
    if(!err){
        console.log('MONGO DB succesfully connected')
    } else {
        console.log('Error in DB connection')
    }
});


app.listen(5000, () => {
    console.log(`App listening on port ${port}!`)
});

app.get("/",(req,res) =>{
    res.sendFile(__dirname + "/index.html")
});

app.post("/addname", (req, res) => {
    
    //create a new instance of the model
var myData = new User(req.body);
myData.save()
.then(item => {
    res.send("Item saved to database")
})
.catch(err => {
    res.status(400).send("Unables to save to the database");
})
});


//Creating the Schema
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});

/*While creating a model ,takes in two parameters, the collection 
name that is users and the schema name */

var User = mongoose.model("User", nameSchema);