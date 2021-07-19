const route = require('express').Router();
const EXAM_MODEL = require('../models/exam');
const ROLE_ADMIN = require('../utils/checkRole');
const checkActive = require('../utils/checkActive');

route.post('/add-exam', checkActive, ROLE_ADMIN, async(req, res) => {
    let { name } = req.body;
    let infoAfterInsert = await EXAM_MODEL.insert({ name });
    res.json(infoAfterInsert);
});
route.get('/info-exam/:examID', checkActive, ROLE_ADMIN, async(req, res) => {
    let { examID } = req.params;
    let infoExam = await EXAM_MODEL.getInfo({ examID });
    return res.json(infoExam);
});
route.get('/list-exam', checkActive, ROLE_ADMIN, async(req, res) => {
    let listExam = await EXAM_MODEL.getList();
    return res.json(listExam)
});
route.post('/update-exam/:examID', checkActive, ROLE_ADMIN, async(req, res) => {
    let { examID } = req.params;
    let { name } = req.body;
    let infoAfterUpdate = await EXAM_MODEL.update({ examID, name });
    return res.json(infoAfterUpdate)
});
route.get('/remove-exam/:examID', checkActive, ROLE_ADMIN, async(req, res) => {
    let { examID } = req.params;
    let removeExam = await EXAM_MODEL.remove({ examID });
    return res.json(removeExam);
});
module.exports = route;