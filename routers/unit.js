const route = require('express').Router();
const UNIT_MODEL = require('../models/unit');

route.post('/insert-unit', async (req, res) => {

    let{name, image, vocabluary, paragraph} = req.body;

    console.log(name, image, vocabluary, paragraph);
    let infoAfterInsert = await UNIT_MODEL.insert({name, image, vocabluary, paragraph});
    return res.json(infoAfterInsert);
})

route.get('/info-unit/:unitID', async (req, res) =>{
    let {unitID} = req.params;
    let infoUnit = await UNIT_MODEL.getInfo({unitID});
    res.json(infoUnit);
})
route.get('/list-unit', async (req, res) => {
    let listUnit = await UNIT_MODEL.getList();
    console.log(listUnit);
    res.json(listUnit);
})
route.post('/update-unit/:unitID', async (req, res) =>{
    let {unitID} = req.params;
    let { name, image, vocabluary, paragraph} = req.body;
    let infoAfterUpdate = await UNIT_MODEL.Update({unitID, name,  image, vocabluary, paragraph});
    res.json(infoAfterUpdate);
})
route.get('/remove-unit/:unitID', async (req, res)=>{
    let {unitID} = req.params;
    console.log({unitID});
    let infoAfterRemove = await UNIT_MODEL.remove({unitID});
    res.json(infoAfterRemove);
})
module.exports = route;