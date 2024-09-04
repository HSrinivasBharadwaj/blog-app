require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const UserRouter = require('./routes/user-routes');
const CategoryRouter =require('./routes/category-routes');
const BlogRouter = require('./routes/blog-routes');

const app = express();

app.use(express.json());
app.use(cors())
app.use("/uploads",express.static(path.join(__dirname,  'uploads')))
app.use("/api", UserRouter)
app.use("/category", CategoryRouter)
app.use("/blog",BlogRouter)


mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT);
    console.log("Connected to mongodb and listening on port 4000")
})
.catch((error) => {
    console.log(error)
})
