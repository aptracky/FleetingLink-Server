const express = require('express');
const router = express.Router();
const validURL = require('valid-url');
const shortId = require('shortid');
require('dotenv').config();

const BaseURL = process.env.BASEURL;

const UrlModel = require('../models/url');

/**
 * @Route Post /api/url/shorten
 * @description Create short URL
 */
router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;

    if(!validURL.isUri(BaseURL)){
        return res.status(401).json('Bad Base Url');
    }

    //Create url code
    const urlCode = shortId.generate();

    //check long url
    if(validURL.isUri(longUrl)) {
        try {
            let url = await UrlModel.findOne({ longUrl });

            if(url) {
                res.json(url)
            } else {
                const shortUrl = BaseURL + '/' + urlCode;

                url = new UrlModel({
                    urlCode,
                    longUrl,
                    shortUrl,
                    date: new Date()
                });

                await url.save();

                res.json(url);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server Error Generating');
        }
    } else {
        res.status(401).json('Invalid long url');
    }
})

module.exports = router;