const express = require('express');
const router = express.Router();
const UrlModel = require('../models/url');


/**
 * @Router Get /:urlCode
 * @description Redirect to the original or long url
 */
router.get('/:code', async (req, res) => {
    try {
        const url = await UrlModel.findOne({ urlCode: req.params.code });

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

module.exports = router;