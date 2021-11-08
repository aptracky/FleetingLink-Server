const express = require('express');
const Router = express.Router();
const UrlModel = require('../models/url');


/**
 * @Router Get /:urlCode
 * @description Redirect to the long url
 */
Router.get('/:urlCode', async (req, res) => {
    try {
        console.log(req.params.urlCode);
        const url = await UrlModel.findOne({ urlCode: req.params.urlCode });

        if(url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('No url found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});

module.exports = Router;