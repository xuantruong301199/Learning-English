const route  = require('express').Router();
const EXAM_MODEL = require('../models/exam');

route.post('/add-exam', async(req, res) =>{
    let{name}= req.body;
    let infoAfterInsert = await EXAM_MODEL.insert({name});
    res.json(infoAfterInsert);
});
route.get('/info-exam/:examID', async (req, res) => {
    let {examID} = req.params;
    let infoExam = await EXAM_MODEL.getInfo({examID});
    return res.json(infoExam);
});
route.get('/list-exam', async (req, res)=> {
    let listExam = await EXAM_MODEL.getList();
    return res.json(listExam)
});
route.post('/update-exam/:examID', async(req, res) => {
    let {examID} = req.params;
    let {name} = req.body;
    let infoAfterUpdate = await EXAM_MODEL.update({examID, name});
    return res.json(infoAfterUpdate)
});
route.get('/remove-exam/:examID', async (req, res) => {
    let {examID} = req.params;
    let removeExam = await EXAM_MODEL.remove({examID});
    return res.json(removeExam);
});
module.exports = route;