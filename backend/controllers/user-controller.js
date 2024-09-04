const bcrypt = require('bcryptjs')
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const SignUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (error) {
        return res.status(500).json({ message: "Could not find the user" })
    }
    if (existingUser) {
        return res.status(400).json({ message: "User already exists, please choose another email" })
    }
    let hashedPassword;
    try {
        hashedPassword = bcrypt.hash(password, 12)
    } catch (error) {
        return res.status(500).json({ message: "Password encryption failed." });
    }

    const user = new User({
        name,
        email,
        password: hashedPassword
    })
    try {
        await user.save()
    } catch (error) {
        return res.status(500).json({ message: "Could not create the user" })
    }
    return res.status(200).json({ message: "User created successfully", user })
}


const LogIn = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (error) {
        return res.status(500).json({ message: "Could not find the user" })
    }
    if (!existingUser) {
        return res.status(400).json({ message: "User does not exist, please create a new one" })
    }
    let isPasswordCorrect
    try {
        isPasswordCorrect = bcrypt.compare(password,existingUser.password)
    } catch (error) {
        return res.status(500).json({ message: "Password comparison failed." });
    } 
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Password do not match" })
    }
    const token = jwt.sign({user:existingUser._id},process.env.SECRET,{
        expiresIn: "1d"
    })
    return res.status(200).json({ message: "User Logged in successfully",token,existingUser })
}

module.exports = { SignUp, LogIn }