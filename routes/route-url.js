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
    const { urlCode } = req.body;

    let code = urlCode;

    if(!validURL.isUri(BaseURL)){
        return res.status(401).json('Bad Base Url');
    }

    //Validate the URL if it is passed in.
    console.log(code);
    if (code) {
        try {
            let alreadyExsists = await (await UrlModel.find({ code })).toString();
            console.log(alreadyExsists);
            if(alreadyExsists){
                return res.status(400).json('This alias already exsists. Please try again.');
            }
        } catch(err) {
            return res.status(500).json("Server Error");
        }
    } else {
        code = shortId.generate();
    }


    //check long url
    if(validURL.isUri(longUrl)) {
        try {
            const shortUrl = BaseURL + '/' + code;

            url = new UrlModel({
                code,
                longUrl,
                shortUrl,
                createdAt: new Date()
            });

            await url.save();

            return res.json(url);
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(401).json('Invalid long url');
    }
})

module.exports = router;