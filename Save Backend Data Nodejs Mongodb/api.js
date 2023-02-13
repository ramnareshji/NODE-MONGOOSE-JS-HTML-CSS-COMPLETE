console.log("This is first website");
console.log("2type ka error sabse jayda hoga 1. single and double desh , dusra code ka arrangement ");

 // I have deleted module package ,so u need to download it by yourself.
 // first download nodejs set its path into path variables in your computer
 // second download node 
 // third run mongod and 
 // install npm i mongoose , express ,mongoose, bodyparser and then connect to remote Mongo instance






//added npm i express
const express = require("express");
const path = require("path");

//added npm i mongoose 
const mongoose = require("mongoose");
// added npm i bodyparser
const bodyparser = require("body-parser");
//added npm i express
const app = express();
const port = 800;

// Connect to a remote MongoDB instance
mongoose.connect('mongodb://127.0.0.1:27017/contactdb', { useNewUrlParser: true, useUnifiedTopology: true },
 (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Connected to MongoDB successfully!');
  }
});


// Define the schema for our documents
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    desc: String,
  });


// Create a model based on the schema
const Contact = mongoose.model('ContactDetail', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS  
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{

    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse") })
    
})



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
