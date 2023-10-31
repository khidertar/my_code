//imports from external packages
const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
//const port = 3000

//imports from my files
const fruitsData = require("./fruits.json")
const fruitsArray = require("./fruits2")
const { logger } = require("./logger")

//middleware
app.use(express.json()) //middleware to parse json data in request body
app.use(logger)


//endpoints


app.get('/', (req, res) => {
  res.send('Hello Fruit!') //like res.end in node
}) //express means we don't have to worry about worry about non routes

app.get("/fruits", (req, res) => { //if url ends in /chickens, this shows up
    //res.sendStatus(204).send("Buckarkkk!") //204 usually used when deleting something
    //res.send(fruitsData) //json
    res.send(fruitsArray) //js
})

app.get("/fruits/:name", (req,res) => {  //taking requests into the server, in this case its an object
    //res.send(req.query)
    let fruitName = req.params.name.toLowerCase();
    console.log(fruitName);
    //const fruit = fruitsData.filter(fruit => fruit.name.toLowerCase() === fruitName) //gets the entire object of each fruit, JSON
    const fruit = fruitsArray.filter(fruit => fruit.name.toLowerCase() === fruitName) //js
    if(fruit === undefined){
      res.status(404).send("No Fruit found")
    } else {
      res.send(fruit)
    }
    res.send(`Return a fruit with id ${fruitName}`)
})

app.post("/fruits", (req,res) => { //request, response
  const fruit = req.body;
  console.log(fruit);
  fruitsArray.push(fruit)
  res.send("New fruit made")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})