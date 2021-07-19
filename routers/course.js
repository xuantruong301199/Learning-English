const route         = require('express').Router();
const COURSE_MODEL = require('../models/course');
const UNIT_MODEL = require('../models/unit');
const { renderToView } = require('../utils/renderToView');
const ROLE_SUPER_ADMIN        = require('../utils/roleSuperAdmin');
const checkActive       = require('../utils/checkActive');

//Thêm khóa học
// route.get('/insert-course', async (res,req) => {
//     renderToView(req, res, 'pages/insert-course',{ })
// })

route.post('/insert-course',ROLE_SUPER_ADMIN, async (req, res) => {
    let { name, image, description } = req.body;
    
    let infoAfterInsert = await COURSE_MODEL.insert({ name, image, description });
    console.log(infoAfterInsert);
    return res.json(infoAfterInsert);
});

route.get('/detail',checkActive, async function (req, res) {
    let { courseID } = req.query;
    let listUnit = await UNIT_MODEL.getList({ courseID });
    let infoCourse = await COURSE_MODEL.getInfo({ courseID });
    renderToView(req, res, "pages/course", { infoCourse: infoCourse.data, listUnit:listUnit.data });
});

route.get('/info-course/:courseID',checkActive, async (req, res) => {
    let{ courseID } = req.params;
    let infoCourse = await COURSE_MODEL.getInfo ({courseID});
    return res.json(infoCourse);
});

route.get('/list-course',checkActive, async (req, res) =>{
    let listCourse = await COURSE_MODEL.getList();
    return res.json(listCourse);
});



route.post('/update-course/:courseID',ROLE_SUPER_ADMIN, async (req, res) => {
    let { name, description, image } = req.body;
    let {courseID} = req.params;
    let infoAfterUpdate = await COURSE_MODEL.Update({courseID, name, description, image });
    res.json(infoAfterUpdate);
})
route.get('/remove-course/:courseID',ROLE_SUPER_ADMIN, async (req, res) => {
    let {courseID} = req.params;
    let infoAfterRemove = await COURSE_MODEL.remove(courseID);
    res.json(infoAfterRemove);
})
module.exports = route;
