const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require('bcrypt')
require('dotenv').config()

app.use(express.json());
app.use(cors());


const dbName = 'authentication';
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_SRC = process.env.DB_SRC
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_SRC}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
   client.connect().then(() => {

    app.listen(3000, function () {
      console.log("server is running");
    });

       console.log('Connected to MongoDB');
       const db = client.db(dbName);
       const usersCollection = db.collection('users');

       app.post('/create-user', async (req, res) => {
        console.log("create user")
        const userData = req.body;
        userData.password = await bcrypt.hash(userData.password, 10)
            usersCollection.insertOne(userData).then((result) => {
                if (!result.insertedId) {
                  console.log("User Creation Error");
                  res.sendStatus(500);
                } else {
                  console.log(result);
                  res.sendStatus(200);
                }
              });
        })
        app.post("/save-data", (req,res) => {
            const updateData = req.body
            usersCollection.updateOne(
                { username: updateData.username },
                { $set: { gameInfo: updateData.gameInfo } }
              ).then((result) => {
                    res.sendStatus(200)
              })
          })

        app.post('/login', (req, res) => {
            const loginData = req.body;
            usersCollection.findOne({ username: loginData.username }).then((result) => {
                if (result) {  // If a user document is found
                bcrypt.compare(loginData.password,result.password, (error, match) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                } else if (match) {  // If the passwords match
                    console.log('Login successful');
                    res.send(result.gameInfo);
                } else {  // If the passwords do not match
                    console.log('Incorrect password');
                    res.sendStatus(401);
                }
                });
            } else {  // If no user document is found
                console.log('Username not found');
                res.sendStatus(401);
            }
            });
        });
 });




 const path = require("path")
 const DIST_DIR = path.join(__dirname, "public");
 const HTML_FILE = path.join(DIST_DIR, "index.html");
 

 app.use(express.static("public"));
 app.use(express.static("src"));
 
 app.get("/", (req, res) => {
    res.sendFile(HTML_FILE, function(err){
       if(err){
          res.status(500).send(err);
       }
    });
 });

