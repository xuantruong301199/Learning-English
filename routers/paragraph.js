const route = require("express").Router();
const PARAGRAPH_MODEL = require("../models/paragraph");
const { cpUpload } = require("../utils/config_multer");

route.post("/add-paragraph", cpUpload , async (req, res) => {
    let {  english, tiengvietese, unitID } = req.body;
    let image = req.files['image'][0];

    console.log({ unitID});
  let infoAfterInsert = await PARAGRAPH_MODEL.insert({
    image: image.filename,
    english,
    tiengvietese,
    unit: unitID,
  });
    return res.json(infoAfterInsert);
    
});
route.get("/info-paragraph/:paraID", async (req, res) => {
  let { paraID } = req.params;
  let infoPara = await PARAGRAPH_MODEL.getInfo({ paraID });
  return res.json(infoPara);
});
route.get("/list-paragraph", async (req, res) => {
  let listVocab = await PARAGRAPH_MODEL.getList();
  return res.json(listVocab);
});
route.post("/update-paragraph/:paraID", async (req, res) => {
  let { paraID } = req.params;
  let { english, image, tiengvietese, numerical } = req.body;
  let infoAfterUpdate = await PARAGRAPH_MODEL.update({
    paraID,
    english,
    image,
    tiengvietese,
    numerical,
  });
  return res.json(infoAfterUpdate);
});
route.get("/remove-paragraph/:paraID", async (req, res) => {
  let { paraID } = req.params;
  let removePara = await PARAGRAPH_MODEL.remove({ paraID });
  return res.json(removePara);
});

module.exports = route;
