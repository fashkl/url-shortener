const mongoose = require('mongoose')
const shortId = require('shortid')


const shortUrlSchema = new mongoose.Schema({

    full:{
        type: String,
        required: true,
    },
    short:{
        type: String,
        required: true,
        default: shortId.generate
    },
    cliks:{
        type: Number,
        required: true,
        default: 0
    },

})

//to export the model to use it in App --> it is a kind of hooks for db
module.exports = mongoose.model('ShortUrl', shortUrlSchema)