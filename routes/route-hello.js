const express = require('express');
const Router = express.Router();
const UrlModel = require('../models/url');


/**
 * @Router Get /hello
 * @description says hello
 */
Router.get('/hello', async (req, res) => {
    res.send('Hello World');
});

module.exports = Router;