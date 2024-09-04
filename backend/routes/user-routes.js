const express = require('express');
const { SignUp, LogIn } = require('../controllers/user-controller');
const userRouter = express.Router();


userRouter.post("/signup",SignUp );
userRouter.post("/login", LogIn )

module.exports = userRouter;