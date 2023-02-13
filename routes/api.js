const express = require('express');
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")

router.get("/register", async (req, res) => {
    try{
        const userID = req.cookies.id
        const user = await User.findOne({_id: userID})
        res.render("register", {
            user: user
        })
    } catch (error) {
        console.log(error)
    }
})

router.post("/register", async (req, res) => {
    try {
        const {name, email, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = [
            new User({
                name: name,
                email: email,
                password: hashedPassword,
            })
        ]

        newUser.forEach((data) => {
            data.save((error) => {
                if(error){
                    console.log(error)
                } else {
                    console.log(data)
                    res.redirect("/api/login")
                }
            })
        })
    } catch (error) {
        console.log(error)
    }
})

router.get("/login", async (req, res) => {
    try {
        const userID = req.cookies.id
        const user = await User.findOne({_id: userID})
        res.render("login", {user: user})
    } catch (error) {
        console.log(error)
    }
})

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({ email: email })
        const comparedPassword = await bcrypt.compare(password, user.password)

        if(user){
            if(comparedPassword){
                res.cookie("id", user.id)
                res.redirect("/")
            } else {
                res.send("error")
            }
        } else {
            console.log("Not found")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/logout", async (req, res) => {
    try {
        res.clearCookie("id")
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
})

module.exports = router