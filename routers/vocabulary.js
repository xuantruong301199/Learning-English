const route = require("express").Router();
const VOCABULARY_MODEL = require("../models/vocabulary");
const UNIT_MODEL = require("../models/unit");
const { cpUpload } = require("../utils/config_multer");

route.post("/add-vocabulary", cpUpload, async(req, res) => {
    try {
        let { english, tiengvietese, spelling, unitID } = req.body;
        let image = req.files['image'][0];
        let sound = req.files['sound'][0];
        let infoVocab = await VOCABULARY_MODEL.insert({
            english,
            tiengvietese,
            spelling,
            image: image.filename,
            listen: sound.filename,
            unit: unitID,
        });
        console.log({ infoVocab });
        return res.json(infoVocab);
    } catch (error) {
        res.json(error.message);
    }
});

route.get("/info-vocabulary/:vocabID", async(req, res) => {
    let { vocabID } = req.params;
    let infoVocab = await VOCABULARY_MODEL.getInfo({ vocabID });
    return res.json(infoVocab);
});
route.get("/list-vocabulary", async(req, res) => {
    let listVocab = await VOCABULARY_MODEL.getList();
    return res.json(listVocab);
});
route.post("/update-vocabulary/:vocabID", async(req, res) => {
    let { vocabID } = req.params;
    let { english, image, tiengvietese, spelling } = req.body;
    let infoAfterUpdate = await VOCABULARY_MODEL.update({
        vocabID,
        english,
        image,
        tiengvietese,
        spelling,
    });
    return res.json(infoAfterUpdate);
});
route.get("/remove-vocabulary/:vocabID", async(req, res) => {
    let { vocabID } = req.params;
    let removeVocab = await VOCABULARY_MODEL.remove({ vocabID });
    return res.json(removeVocab);
});
module.exports = route;