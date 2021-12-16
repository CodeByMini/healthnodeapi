const mongoose = require('mongoose');

const health = new mongoose.Schema({
    date: {
        type: String, 
        required:true
    },
    value:  {
        type: Number
    }
});

module.export =  {health}