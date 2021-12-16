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

app.get('/getrecords', function(req, res) {
    Health.find({}).sort([['date']]).exec(function(err, health){
        console.log("data sent")
        res.send(health);
    });
});

app.get('/getrecords/:device', function(req, res) {
    console.log(req.params.device)
    Health.find({device: req.params.device}).sort([['date']]).exec(function(err, health){
        console.log("data sent")
        res.send(health);
    });
});

app.get('/delete/:device', function(req, res){
    if(req.query.apikey==APIKEY){
    Health.deleteMany({device:req.params.device}).exec(function(err, res) {});
    res.send("All records deleted")
    }
})

app.get('/delete', function(req, res){
    if(req.query.apikey==APIKEY){
    Health.deleteMany({}).exec(function(err, res) {});
    res.send("All records deleted")
    }
})

app.get('/senddata', function(req, res) {
    console.log()
    if(req.query.apikey==APIKEY){
        const health = new Health({
            date: req.query.date,
            value: req.query.value,
        })
        console.log(health.date)
        console.log(health.value)
        health.save(function(err){
            if(!err){
                res.send("Records recorded. must been a record!");
            }else{
                console.log(err)
            }
        })
    }
    else{
        res.send("<center><iframe width='560' height='315' src='https://www.youtube.com/embed/K3PrSj9XEu4' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></center>");
    }
});

app.post('/postdata', function(req, res){
    if(req.get("apikey")==APIKEY){
    let data = req.body;
        Health.insertMany(data).then(function(){
            console.log("Data inserted")  // Success
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