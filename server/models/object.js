const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const objectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: new Date()
    },
    endDate: {
        type: Date,
        required:true
    },
    description: {
        type: String
    },
    seller: {
        type: Schema.Types.ObjectId,
        required: true
    },
    currentBid: {
        type: Number,
        required:true
    },
    mostRecentBidder: 
    {
        type: Schema.Types.ObjectId
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Object', objectSchema)