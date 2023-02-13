const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Category = require('../models/Category')
const News = require('../models/News');
const Ads = require('../models/Ads');

router.get("/", async (req, res) => {
    try {
        const userID = req.cookies.id
        const user = await User.findOne({ _id: userID })
        const ads = await Ads.find({}).sort({ Date: -1 })
            res.render("user/index", {
                user: user,
                ads: ads
                
            })
    } catch (error) {
        console.error(error);
    }
})

router.get("/teams", async (req, res) => {
    try {
        const userID = req.cookies.id
        const user = await User.findOne({ _id: userID })
        const teams = await Category.find({}).sort({ Date: -1 })
            res.render("user/teams", {
                user: user,
                teams: teams
            })
    } catch (error) {
        console.error(error);
    }
})


router.get("/news", async (req, res) => {
    try {
        const userID = req.cookies.id
        const user = await User.findOne({ _id: userID })
        const news = await News.find({}).sort({ Date: -1})
            res.render("user/news", {
                user: user,
                news: news,
            })
    } catch (error) {
        console.error(error);
    }
})

router.get("/news/:id", async (req, res) => {
    try {
        const userID = req.cookies.id
        const user = await User.findOne({ _id: userID })
        const data = await News.findOne({ _id: req.params.id })
            res.render("user/news-info", {
                user: user,
                data: data,
            })
    } catch (error) {
        console.error(error);
    }
})

router.get("/teams/:name", async (req, res) => {
    try {
        const userID = req.cookies.id
        const user = await User.findOne({ _id: userID })
        const news = await News.find({ cat: req.params.name }).sort({ Date: -1})
            res.render("user/news", {
                user: user,
                news: news,
            })
    } catch (error) {
        console.error(error);
    }
})

module.exports = router