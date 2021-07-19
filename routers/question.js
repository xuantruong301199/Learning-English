const route = require('express').Router();
const QUESTION_MODEL = require('../models/question');
const { uploadMulter }  = require('../utils/config_multer');
const fs                = require('fs');
const path = require('path');
const ROLE_ADMIN        = require('../utils/checkRole');

route.post('/add-question', uploadMulter.single('image'), ROLE_ADMIN,  async (req, res) => {
    try{
        let userIDfromSession = req.session; //Đã gán req.session.user
        let userID = userIDfromSession.user.infoUSer._id;
        let { name, examID, answer, correct } = req.body;
        let infoFile = req.file;
        let infoQuestion;
        if(infoFile) {
            infoQuestion = await QUESTION_MODEL.insert({ name, answer, examID, correct, image: infoFile.originalname, userID });
        } else {
            infoQuestion = await QUESTION_MODEL.insert({ name,  answer, examID, correct, userID});
        }
        return res.json(infoQuestion);
    } catch(error) {
        res.json(error.message);
    }
});
route.get('/info-question/:questionID', async (req, res) => {
    let {questionID} = req.params;
    let infoQuestion = await QUESTION_MODEL.getInfo({questionID});
    res.json(infoQuestion)
})
route.get('/list-question', async (req, res) => {
    let listQuestion = await QUESTION_MODEL.getList();
    res.json(listQuestion)
})
route.post('/update-question/:questionID', async (req, res) => {
    let { questionID} = req.params;
    let {name, image, answer, examID} = req.body
    let listQuestion = await QUESTION_MODEL.update({questionID, name, image, answer, examID});
    res.json(listQuestion)
})
route.get('/remove-question/:questionID', async (req, res) => {
    let { questionID} = req.params;
    let listQuestion = await QUESTION_MODEL.remove({questionID});
    res.json(listQuestion)
})
module.exports = route;

