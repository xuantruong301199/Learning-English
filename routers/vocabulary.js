const route              = require('express').Router();
const VOCABULARY_MODEL = require('../models/vocabulary');
const { uploadMulter }  = require('../utils/config_multer');
const fs                = require('fs');
const path              = require('path');

route.post('/add-vocabulary',uploadMulter.single('image'), async(req, res) =>{
    try {
        // let userIDfromSession = req.session; //Đã gán req.session.user
        // let userID = userIDfromSession.user.infoUSer._id;
        let { english, image, tiengvietese, sound } = req.body;        
        let infoFile = req.file;       
        let infoVocab;
        if(infoFile) {
            infoVocab = await VOCABULARY_MODEL.insert({ english, image, tiengvietese, sound, image: infoFile.originalname});
        } else {
            infoVocab = await VOCABULARY_MODEL.insert({ english, image, tiengvietese, sound});
        }
        return res.json(infoVocab);
    } catch (error) {
        res.json(error.message);
    }
});

route.get('/info-vocabulary/:vocabID', async (req, res) => {
    let {vocabID} = req.params;
    let infoVocab = await VOCABULARY_MODEL.getInfo({vocabID});
    return res.json(infoVocab);
});
route.get('/list-vocabulary', async (req, res)=> {
    let listVocab = await VOCABULARY_MODEL.getList();
    return res.json(listVocab)
});
route.post('/update-vocabulary/:vocabID', async(req, res) => {
    let {vocabID} = req.params;
    let {english, image, tiengvietese, sound,} = req.body;
    let infoAfterUpdate = await VOCABULARY_MODEL.update({vocabID, english, image, tiengvietese, sound});
    return res.json(infoAfterUpdate)
});
route.get('/remove-vocabulary/:vocabID', async (req, res) => {
    let {vocabID} = req.params;
    let removeVocab = await VOCABULARY_MODEL.remove({vocabID});
    return res.json(removeVocab);
});
module.exports = route;