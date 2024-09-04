const express = require('express');
const GetAllCategories = require('../controllers/category-controller');
const categoryRouter = express.Router();

categoryRouter.get("/categories", GetAllCategories);

module.exports = categoryRouter