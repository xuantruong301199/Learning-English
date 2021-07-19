const ObjectID = require("mongoose").Types.ObjectId;
const PARAGRAPH_COLL = require("../databases/paragraph-coll");

module.exports = class paragraph extends PARAGRAPH_COLL {
  static insert({ image, english, tiengvietese, unit }) {
    return new Promise(async (resolve) => {
      try {
        let dataInsert = {
          image,
          english,
          tiengvietese,
          unit,
          };
          console.log({dataInsert});
        if (!ObjectID.isValid(unit))        
          return resolve({ error: true, message: "params_invalid" });
        let infoAfterInsert = new PARAGRAPH_COLL(dataInsert);
        let saveDataInsert = await infoAfterInsert.save();

        if (!saveDataInsert)
          return resolve({ error: true, message: "Khong the them" });
        return resolve({ error: false, data: dataInsert });
      } catch (error) {
        return resolve({ erro: true, message: error.message });
      }
    });
  }
  static getList({ unitID }) {
    return new Promise(async (resolve) => {
      try {
        let listPara = await PARAGRAPH_COLL.find({ unit: unitID });
        if (!listPara)
          return resolve({ error: true, message: " Khong hop le" });

        return resolve({ error: false, data: listPara });
      } catch (error) {
        return resolve({ error: true, message: error.message });
      }
    });
  }
  static getInfo({ paraID }) {
    return new Promise(async (resolve) => {
      try {
        if (!ObjectID.isValid(paraID))
          return resolve({ error: true, message: "khong hop le" });
        let infoPara = await PARAGRAPH_COLL.findById(paraID);
        if (!infoPara)
          return resolve({ error: true, message: "Khong the tim thay" });

        return resolve({ error: false, data: infoPara });
      } catch (error) {
        return resolve({ error: true, message: error.message });
      }
    });
  }
  //Sửa thông tin từ vựng
  static Update({ paraID, image, english, tiengvietese, numerical }) {
    return new Promise(async (resolve) => {
      try {
        if (!ObjectID.isValid(paraID))
          return resolve({ error: true, message: "khong hop le" });
        let dataUpdate = {
          image,
          english,
          tiengvietese,
          numerical,
        };
        // if(file){
        //     dataUpdate.file = file;
        // }
        // console.log(file);
        let infoAfterUpdate = await PARAGRAPH_COLL.findByIdAndUpdate(
          paraID,
          dataUpdate
        );

        if (!infoAfterUpdate)
          return resolve({ error: true, message: "Khong the sua doan van" });

        return resolve({ error: false, data: infoAfterUpdate });
      } catch (error) {
        return resolve({ error: true, message: error.message });
      }
    });
  }
  //Xóa từ vựng
  static remove({ paraID }) {
    return new Promise(async (resolve) => {
      try {
        let infoAfterRemove = await PARAGRAPH_COLL.findByIdAndDelete(paraID);
        if (!infoAfterRemove)
          return resolve({ error: true, message: "khong the xoa khoa hoc" });

        if (!ObjectID.isValid(paraID))
          return resolve({ erorr: true, message: "khong hop le" });
        // let infoExamRemove = await EXAM_COLL.deleteMany({ subject: subjectID })
        return resolve({ error: false, data: infoAfterRemove });
      } catch (error) {
        return resolve({ erorr: true, message: error.message });
      }
    });
  }
};
