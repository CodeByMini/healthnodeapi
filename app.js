require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');

const APIKEY = process.env.APIKEY;

let PORT = 3333
let mongodb = process.env.MONGODB

mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify:false})

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const health = new mongoose.Schema({
    date: {
        type: String, 
        required:true
    },
    value:  {
        type: Number
    },
    device: {
        type : String
    },
    nightsout: {
        type: String
    }
});

const Health = mongoose.model('health', health);

app.route('/api/:device')
    .get(function(req, res) {
        console.log(req.params.device)
        console.log("got data from: " + req.params.device)
        Health.find({device: req.params.device}).sort([['date']]).exec(function(err, health){
            console.log("data sent")
            res.send(health);
        }); 
    })

    .delete(function(req, res){
        console.log("data deleted for: " + req.params.device)
        if(req.query.apikey==APIKEY){
        Health.deleteMany({device:req.params.device}).exec(function(err, res) {});
        res.send("All records deleted")
        }
    })

    .post(function(req, res){
        if(req.get("apikey")==APIKEY){
        let data = req.body;
            Health.insertMany(data).then(function(){
                console.log("Data inserted for: "+ req.params.device)  // Success
                res.send({
                    'status': 'success'
                });
            }).catch(function(error){
            console.log(error)      // Failure
            res.send({
                'status': 'failed'
              });
        });
    }
    else{
        res.send("Wrong APIKEY")
    }});

app.listen(PORT, function() {
    console.log("listening on port " + PORT);
})