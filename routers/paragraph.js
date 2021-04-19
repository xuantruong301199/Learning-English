const route = require('express').Router();
const PARAGRAPH_MODEL = require('../models/paragraph');

route.post('/add-paragraph', async (req, res)=>{
    let {name, image, english, tiengvietese} =req.body;
    console.log({name, image, english, tiengvietese});
    let infoAfterInsert = await PARAGRAPH_MODEL.insert({name,image, english, tiengvietese});
    return res.json(infoAfterInsert);
});

module.exports = route;