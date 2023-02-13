const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },

    des: {
        type: String,
        require: true,
    },

    image: {
        type: String,
        require: true,
    },

    link: {
        type: String,
        require: true,
    },

    Date: {
        type: String,
        require: true,
    }
})

const Ads = mongoose.model('Ads', adsSchema, 'Ads')
module.exports = Ads