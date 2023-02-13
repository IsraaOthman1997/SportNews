const express = require('express');
const app = express();
const db = require('./config/database')
const index = require('./routes/index')
const api = require('./routes/api')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const admin = require('./routes/admin')
const methodOverride = require('method-override');
const User = require('./models/User');
const Category = require('./models/Category');
const News = require('./models/News');

let PORT = 3001;

app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(methodOverride("_method"))
app.use("/", index)
app.use("/api", api)
app.use("/admin", admin)

app.delete("/admin/category/delete/:id", async (req, res) => {
    try {
        const userID = req.cookies.id
        const user = await User.findOne({ _id: userID })

        if(user){
            if(user.isAdmin == true){
                await Category.deleteOne({ _id: req.params.id })
                res.redirect("/admin/category")
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

app.put("/admin/cetegory/edit/:id", async (req, res) => {
    try {
        const userID = req.cookies.id
        const user = await User.findOne({ _id: userID })
        const name = req.body.name

        if(user){
            if(user.isAdmin == true){
                await Category.updateOne({ _id: req.params.id }, {
                    $set: {
                        name: name,
                    }
                })

                res.redirect("/admin/category")
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

app.delete("/admin/news/delete/:id", async (req, res) => {
    try {
        const userID = req.cookies.id
        const user = await User.findOne({ _id: userID })

        if(user){
            if(user.isAdmin == true){
                await News.deleteOne({ _id: req.params.id })
                res.redirect("back")
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

app.put("/admin/edit-news/:id", async (req, res) => {
    try {
        const userID = req.cookies.id
        const user = await User.findOne({ _id: userID })
        const {title, des, cat} = req.body

        if(user){
            if(user.isAdmin == true){
                await News.updateOne({ _id: req.params.id }, {
                    $set: {
                        title: title,
                        des: des,
                        cat: cat
                    }
                })

                res.redirect("/admin/news")
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

app.listen(PORT, (err) => {
    if(err){

        
        console.log(err)
    } else {
        console.log(`Server is running on port ${PORT}`)
    }
})