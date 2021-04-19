const route = require('express').Router();
const QUESTION_MODEL = require('../models/question');

route.post('/add-question', async (req, res) => {
    try{
        let{ name, image, answer, examID, userID } = req.body;
        //console.log(name, image, answer, examID, userID );
        let infoQuestion = await QUESTION_MODEL.insert({ name, image, answer, examID, userID });
        console.log({ infoQuestion });
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
    let {name, image, answer, examID, userID} = req.body
    let listQuestion = await QUESTION_MODEL.update({questionID, name, image, answer, examID, userID});
    res.json(listQuestion)
})
route.get('/remove-question/:questionID', async (req, res) => {
    let { questionID} = req.params;
    let listQuestion = await QUESTION_MODEL.remove({questionID});
    res.json(listQuestion)
})
module.exports = route;

