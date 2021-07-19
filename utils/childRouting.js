const jwt = require('./jwt.js');
const moment = require('moment');
const EXAM_MODEL = require('../models/exam');
const COURSE_MODEL = require('../models/course');
const USER_MODEL = require('../models/users');
const QUESTION_MODEL = require('../models/question');
const { LEVEL_TYPES } = require('../config/constants/cf_constants');

let renderToView = async function(req, res, view, data) {
    let { token } = req.session;

    let listCourse = await COURSE_MODEL.getList();
    let listExemLimit = await EXAM_MODEL.getListSideBar();
    let listExam = await EXAM_MODEL.getList();
    let listUser = await USER_MODEL.getList();
    let listQuestion = await QUESTION_MODEL.getList();

    if (token) {
        let user = await jwt.verify(token);
        data.infoUser = user.data;

    } else {
        data.infoUser = undefined;
    }

    data.moment = moment;
    data.listExam = listExam.data;
    data.listCourse = listCourse.data;
    data.listExemLimit = listExemLimit.data;
    data.listUser = listUser.data;
    data.listQuestion = listQuestion.data;
    data.LEVEL_TYPES = LEVEL_TYPES;

    return res.render(view, data);
}
exports.renderToView = renderToView;