const route = require('express').Router();
const RESULT_MODEL = require('../models/result');
const ROLE_ADMIN = require('../utils/checkRole');
const checkActive = require('../utils/checkActive');
const QUESTION_MODEL = require('../databases/question-coll');

route.get('/result-exam', checkActive, async (req, res) => {
    let { resultID } = req.query;
    let { examID } = req.query;
    let infoResult = await RESULT_MODEL.getInfo({ resultID })
    let listQuestion = await QUESTION_MODEL.getInfo({ questionID })

    let infoExam = await EXAM_MODEL.getInfo({ examID })
    renderToView(req, res, 'pages/result-test-exam', { infoResult: infoResult.data, infoExam: infoExam.data, listQuestion: listQuestion.data });
})

route.post('/result-exam', checkActive, async (req, res) => {

    let userIDfromSession = req.session; //Đã gán req.session.user
    let userID = userIDfromSession.user.infoUSer._id;

    let { point, falseArr, trueArr, examID, unfinishQuestion } = req.body;

    //console.log({ point, falseArr, trueArr, userID, examID })

    // Kiểm tra quyền/check về logic (nếu có)

    // Thực hiện hành động sau khi đã check logic
    let resultInsert = await RESULT_MODEL.insert({ point, falseArr, trueArr, examID, unfinishQuestion, userID });
    return res.json(resultInsert);

})

route.get('/list-result-exam', ROLE_ADMIN, async (req, res) => {
    renderToView(req, res, 'pages/list-result-exam', { });
})

route.get('/list-result-exam?sort', ROLE_ADMIN, async (req, res) => {
    renderToView(req, res, 'pages/home', { });
})

module.exports = route;