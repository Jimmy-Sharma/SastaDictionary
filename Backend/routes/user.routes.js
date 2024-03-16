const express = require("express")
const userRouter = express.Router()
const { userModel } = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config();


userRouter.get("/", (req, res) => {
    res.send("Welcome to Dictionary App");
});

userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    if (name && email && password) {
        try {
            const previouslyPresent = await userModel.findOne({ email })
            if (previouslyPresent) {
                res.status(500).send("Email Already Register, Please use a different email!!")
            } else {
                bcrypt.hash(password, 5, async (err, hash) => {
                    const user = new userModel({
                        name,
                        email,
                        password: hash
                    });

                    await user.save()
                    res.status(200).send("User Registered Successfully")
                })
            }
        } catch (error) {
            res.status(200).send(error.message)
        }
    } else {
        res.status(400).send("Please enter all the fields")
    }
})




userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    if (email && password) {
        try {
            const user = await userModel.findOne({ email })
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        const token = jwt.sign({ userId: user._id },process.env.secretCode)
                        res.status(200).json({
                            msg: "User logged in successfully",
                            name: user.name,
                            email: email,
                            token: token,
                        });
                    } else {
                        res.status(400).send("Wrong credentials");
                    }
                })
            } else {
                res.status(400).send("No user exists");
            }
        } catch (error) {
            res.status(200).send(error.message)
        }
    } else {
        res.status(400).send("Please enter all the fields")
    }
})


userRouter.patch("/:id", async (req, res) => {
    const ID = req.params.id
    const {name,email,password} = req.body

    const updatedVersion = {
        name,
        email,
        password
    }

    try {
        await ContactModel.findByIdAndUpdate({ _id: ID }, updatedVersion)
        res.status(204).send({
            "msg": "Contact has been updated"
        })
    } catch (error) {
        res.status(400).send({
            "msg": error.message
        })
    }
})

module.exports = { userRouter }