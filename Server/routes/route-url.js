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
    let { urlCode } = req.body;

    let newUrlCode = null;

    if(!validURL.isUri(BaseURL)){
        return res.status(401).json('Bad Base Url');
    }

    //Validate the URL if it is passed in.
    console.log(urlCode);
    if (urlCode) {
        try {
            newUrlCode = await UrlModel.findOne({ urlCode });
            if (newUrlCode == null){
                newUrlCode = urlCode;
            }
        } catch(err) {
            console.error(err);
        }
    } else {
        newUrlCode = shortId.generate();
    }


    //check long url
    if(validURL.isUri(longUrl)) {
        try {
            let url = await UrlModel.findOne({ longUrl });

            if(url) {
                res.json(url)
            } else {
                const shortUrl = BaseURL + '/' + newUrlCode;

                url = new UrlModel({
                    newUrlCode,
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