const express = require('express')
const router = express.Router()
const moment = require('moment')
const Category = require('../models/Category')
const User = require('../models/User')
const News = require('../models/News')
const Ads = require('../models/Ads')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/upload/images")
    },

    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname)
    },
})

const upload = multer({
    storage: storage,
    limit: {
        fileSize: 1024 * 1024 * 1000 * 1000,
    }
})

router.get("/category", async (req, res) => {
    try {
        const userID = req.cookies.id
        const user = await User.findOne({_id: userID})
        const category = await Category.find({}).sort({ Date: -1})

        if(user){
            if(user.isAdmin == true){
                res.render("admin/category", {
                    category: category
                })
            } else {
                res.redirect("/")
            }
        } else {
            res.redirect("/")
        }
    } catch (error) {
        console.error(error)
    }
})

router.get("/add-category", async (req, res) => {
    try {
        const userID = req.cookies.id
        const user = await User.findOne({_id: userID})

        if(user){
            if(user.isAdmin == true){
                res.render("admin/add-category")
            } else {
                res.redirect("/")
            }
        } else {
            res.redirect("/")
        }
    } catch (error) {
        console.error(error)
    }
})

router.post("/add-category", upload.single("image") , async (req, res) => {
    try {
        const userID = req.cookies.id
        const user = await User.findOne({_id: userID})

        if(user){
            if(user.isAdmin == true){
                const newCategory = [
                    new Category({
                        name: req.body.name,
                        image: req.file.filename,
                        Date: moment().format("l")
                    })
                ]

                newCategory.forEach((data) => {
                    data.save((error) => {
                        if(error){
                            console.log(error)
                        } else {
                            console.log(data)
                            res.redirect("/admin/category")
                        }
                    })
                })
            } else {
                res.redirect("/")
            }
        } else {
            res.redirect("/")
        } 
    } catch (error) {
        console.error(error)
    }
})

router.get("/category/edit/:id", async (req, res) => {
    try {
        const userID = req.cookies.id
        const user = await User.findOne({ _id: userID })
        const data = await Category.findOne({ _id: req.params.id })

        if(user) {
            if(user.isAdmin == true){
                res.render("admin/edit-category", {
                    data: data
                })
            }
        } else {
            res.redirect("/")
        }
    } catch (error) {
        console.error(error)
    }
})

router.get("/news", async (req, res) => {
    try {
        const userID = req.cookies.id
        const user = await User.findOne({ _id: userID })
        const news = await News.find({}).sort({ Date: -1 })

        if(user) {
            if(user.isAdmin == true){
                res.render("admin/news", {
                    news: news
                })
            }
        } else {
            res.redirect("/")
        }
    } catch (error) {
        console.error(error)
    }
})

router.get("/add-news", async (req, res) => {
    try {
        const userID = req.cookies.id
        const user = await User.findOne({ _id: userID })
        const cat = await Category.find({}).sort({ Date: -1 })

        if(user) {
            if(user.isAdmin == true){
                res.render("admin/add-news", {
                    cat: cat
                })
            }
        } else {
            res.redirect("/")
        }
    } catch (error) {
        console.error(error)
    }
})

router.post("/add-news",  upload.single("image"), async (req, res) =>{
    try {
        const userID = req.cookies.id
        const user = await User.findOne({ _id: userID })
        const cat = await Category.find({}).sort({ Date: -1 })

        if(user) {
            if(user.isAdmin == true){
                const {title, des, cat, minDes} = req.body
                const newNews = [
                    new News({
                        title: title,
                        des: des,
                        minDes: minDes,
                        cat: cat,
                        image: req.file.filename,
                        Date: moment().format("l"),
                    })
                ]

                newNews.forEach((data) => {
                    data.save((error) => {
                        if(error){
                            console.log(error)
                        } else {
                            console.log(data)
                            res.redirect("/admin/news")
                        }
                    })
                })
            }
        } else {
            res.redirect("/")
        }
    } catch (error) {
        console.error(error)
    }
})

router.get("/edit-news/:id", async (req, res) => {
    try {
        const userID = req.cookies.id
        const user = await User.findOne({ _id: userID })
        const cat = await Category.find({}).sort({ Date: -1 })
        const news = await News.findOne({_id: req.params.id})

        if(user) {
            if(user.isAdmin == true){
                res.render("admin/edit-news", {
                    cat: cat,
                    news: news,
                })
            }
        } else {
            res.redirect("/")
        }
    } catch (error) {
        console.error(error)
    }
})


router.get("/ads", async (req, res) => {
    try {
        const userID = req.cookies.id
        const user = await User.findOne({ _id: userID })
        const ads = await Ads.find({}).sort({ Date: -1 })

        if(user) {
            if(user.isAdmin == true){
                res.render("admin/ads", {
                    ads: ads
                })
            }
        } else {
            res.redirect("/")
        }
    } catch (error) {
        console.error(error)
    }
})

router.get("/ads/add", async (req, res) => {
    try {
        const userID = req.cookies.id
        const user = await User.findOne({ _id: userID })

        if(user) {
            if(user.isAdmin == true){
                res.render("admin/ads-add")
            }
        } else {
            res.redirect("/")
        }
    } catch (error) {
        console.error(error)
    }
})

router.post("/ads/add", upload.single("image"), async (req, res) => {
    try {
        const userID = req.cookies.id
        const user = await User.findOne({ _id: userID })

        if(user.isAdmin == true) {
            const {title, des, link} = req.body
            const newAd = [
                new Ads({
                    title: title,
                    des: des,
                    link: link,
                    image: req.file.filename,
                    Date: moment().locale("ar-kw").format("l")
                })
            ]

            newAd.forEach((data) => {
                data.save()
            })

            res.redirect("/admin/ads")
        } else {
            res.redirect("/")
        }
    } catch (error) {
        console.error(error)
    }
})

router.delete("/ads/delete/:id", async (req, res) => {
    try {
        const userID = req.cookies.id
        const user = await User.findOne({ _id: userID })

        if(user) {
            await Ads.deleteOne({ _id: req.params.id})
            res.redirect("/admin/ads")
        } else {
            res.redirect("/")
        }
    } catch (error) {
        console.error(error)
    }
})

router.get("/ads/edit/:id", async (req, res) => {
    try {
        const userID = req.cookies.id
        const user = await User.findOne({ _id: userID })
        const data = await Ads.findOne({ _id: req.params.id })

        if(user) {
            if(user.isAdmin == true){
                res.render("admin/ads-edit", {
                    data: data
                })
            }
        } else {
            res.redirect("/")
        }
    } catch (error) {
        console.error(error)
    }
})

router.put("/ads/edit/:id", async (req, res) => {
    try {
        const userID = req.cookies.id
        const user = await User.findOne({ _id: userID })

        if(user) {
            if(user.isAdmin == true){
                const {title, des, link} = req.body

                await Ads.updateOne({ _id: req.params.id }, {
                    $set: {
                        title: title,
                        des: des,
                        link: link,
                    }
                })

                res.redirect("/admin/ads")
            }
        } else {
            res.redirect("/")
        }
    } catch (error) {
        console.error(error)
    }
})

module.exports = router