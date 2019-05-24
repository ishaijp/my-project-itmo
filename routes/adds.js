const express = require('express');
const adds = express.Router();
const cors = require('cors');

const Items = require("../models/Item");
adds.use(cors());

adds.post('/comment', (req, res) => {
    const today = new Date()
    const commentData = {
        item: req.body.item,
        creates: today
    }

    Items.findOne({
        where: {
            item: req.body.item
        }
    })
    .then(add => {
        if(add){
                Items.create(commentData)
            }
        } )
    .catch(err => {
        res.send('error: ' + err)
    })
})

module.exports = adds