const route = require('express').Router();
const COMMENT_MODEL = require('../models/comment');

route.post('/add-comment',async(req, res) =>{
    let{ name, content} = req.body;
    let InfoComment = await COMMENT_MODEL.insert({name, content});
    res.json(InfoComment)
});

module.exports = route; 