const route         = require('express').Router();
const COURSE_MODEL = require('../models/course');

//Thêm khóa học
// route.get('/insert-course', async (res,req) => {
//     renderToView(req, res, 'pages/insert-course',{ })
// })

route.post('/insert-course', async (req, res) =>{
    let {name, image, description} = req.body;
    let infoAfterInsert = await COURSE_MODEL.insert({name, image, description});
    return res.json(infoAfterInsert); 

})
route.get('/info-course/:courseID', async (req, res) => {
    let{ courseID } = req.params;
    console.log({ courseID });
    let infoCourse = await COURSE_MODEL.getInfo({courseID});
    return res.json(infoCourse);
});

route.get('/list-course', async (req, res) =>{
    let listCourse = await COURSE_MODEL.getList();
    return res.json(listCourse);
});
// route.post('/update-course/:courseID', async (req, res) => {
//     try
//     {
//     let{courseID} = req.params;
//     let infoCourse = await COURSE_MODEL.getInfo(courseID);


//     let { name, description, image } = req.body;
//     let infoAfterUpdate = await COURSE_MODEL.Update({name, description, image});
    
//     return res.json(infoAfterUpdate);
// }
//     catch(error){
//         return res.json(error.message);
//     }
  
// });
// route.post('/update-course:/courseID', async (req, res) => {
//     let { name, description, image} = req.body;
//     let {courseID} = req.params;
//     // let infoCourse = await COURSE_MODEL.getInfo({courseID});
//     // console.log({ name, description, image});
//     let infoFile = req.file;
    
//     let resultUpdate;

//     if(infoFile){
//         resultUpdate = await COURSE_MODEL.update({ courseID, name, description, image,file: infoFile.originalname});
//     }else{
//         resultUpdate = await COURSE_MODEL.update({ courseID, name, description, image});
//     }
//     return res.json(resultUpdate);
// })


route.post('/update-course/:courseID', async (req, res) => {
    let { name, description, image } = req.body;
    let {courseID} = req.params;
    let infoAfterUpdate = await COURSE_MODEL.Update({courseID, name, description, image });
    res.json(infoAfterUpdate);
})
route.get('/remove-course/:courseID', async (req, res) => {
    let {courseID} = req.params;
    let infoAfterRemove = await COURSE_MODEL.remove(courseID);
    res.json(infoAfterRemove);
})
module.exports = route;
