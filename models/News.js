const mongoose = require('mongoose');

const newNews = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    minDes: {
        type: String,
        required: true,
    },

    des: {
        type: String,
        required: true,
    },

    cat: {
        type: String,
    },

    Date: {
        type: String,
        required: true,
    },

    image: {
        type: String,
    }
})

const News = mongoose.model("News", newNews, "News")
module.exports = News