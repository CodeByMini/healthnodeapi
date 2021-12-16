const mongoose = require('mongoose');
/*
{
"_id": "61af1c7e61337510177c5268",
"type": "sgv",
"date": 1638866039312.2039,
"direction": "Flat",
"sgv": 163,
"dateString": "2021-12-07T08:33:59.000Z",
"device": "CGMBLEKit Dexcom G6 21.0",
"utcOffset": 0,
"sysTime": "2021-12-07T08:33:59.000Z",
"mills": 1638866039000
}

{
"_id": "61af0812613375101774347e",
"absorptionTime": 180,
"eventType": "Meal Bolus",
"foodType": "🌮",
"created_at": "2021-12-07T07:06:54.000Z",
"timestamp": "2021-12-07T07:06:54Z",
"carbs": 10,
"enteredBy": "loop://Caspian Loop",
"utcOffset": 0,
"mills": 1638860814000,
"insulin": null
},
{
"_id": "61af08276133751017743af8",
"type": "normal",
"created_at": "2021-12-07T07:06:30.000Z",
"enteredBy": "loop://Caspian Loop",
"eventType": "Correction Bolus",
"insulin": 0.9,
"programmed": 0.9,
"unabsorbed": 0,
"timestamp": "2021-12-07T07:06:30Z",
"duration": 0.6,
"utcOffset": 0,
"mills": 1638860790000,
"carbs": null
},

*/
const cgm = new mongoose.Schema({
    _id : {
        type: String, 
        },
    type : {
        type: String, 
        },
    created_at: {
        type: String, 
        },
    enteredBy: {
        type: String, 
        },
    eventType: {
        type: String, 
        },
    insulin: {
        type: Number, 
        },
    programmed: {
        type: Number, 
        },
    unabsorbed: {
        type: Number, 
        },
    timestamp: {
        type: Number, 
        },
    duration: {
        type: Number, 
        },
    utcOffset: {
        type: Number, 
        },
    mills: {
        type: Number, 
        },
    carbs: {
        type: Number, 
        },
});

module.export = {cgm}