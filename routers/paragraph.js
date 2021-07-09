const route = require('express').Router();
const PARAGRAPH_MODEL = require('../models/paragraph');

route.post('/add-paragraph', async (req, res)=>{
    let {numerical, image, english, tiengvietese} =req.body;
    console.log({image, english, tiengvietese});
    let infoAfterInsert = await PARAGRAPH_MODEL.insert({numerical, image, english, tiengvietese});
    return res.json(infoAfterInsert);
});
route.get('/info-paragraph/:paraID', async (req, res) => {
    let {paraID} = req.params;
    let infoPara = await PARAGRAPH_MODEL.getInfo({paraID});
    return res.json(infoPara);
});
route.get('/list-paragraph', async (req, res)=> {
    let listVocab = await PARAGRAPH_MODEL.getList();
    return res.json(listVocab)
});
route.post('/update-paragraph/:paraID', async(req, res) => {
    let {paraID} = req.params;
    let {english, image, tiengvietese, numerical} = req.body;
    let infoAfterUpdate = await PARAGRAPH_MODEL.update({paraID, english, image, tiengvietese, numerical});
    return res.json(infoAfterUpdate)
});
route.get('/remove-paragraph/:paraID', async (req, res) => {
    let {paraID} = req.params;
    let removePara = await PARAGRAPH_MODEL.remove({paraID});
    return res.json(removePara);
});

module.exports = route;