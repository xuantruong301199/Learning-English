const ObjectID = require('mongoose').Types.ObjectId;
const VOCABULARY_COLL = require('../databases/vocabulary-coll');

module.exports = class vocabulary extends VOCABULARY_COLL {

    static insert ({english, image, tiengvietese, sound}){
        return new Promise(async resolve => {
            try {
                // if(!image)
                // return resolve({error: true, message: 'Khong hop le'});

                // let checkExist = await VOCABULARY_COLL.findOne({image});
                // if (checkExist)
                // return resolve ({ error: true, message: 'hình ảnh của từ vựng đã tồn tại'});

                let infoInsert = new VOCABULARY_COLL({english, image, tiengvietese, sound});
                
                let saveDataInsert = await infoInsert.save();

                if (!saveDataInsert)
                return resolve({error: true, message:' Khong the them '});
                console.log({english, image, tiengvietese, sound});

                return resolve({ error: false, data: infoInsert});
                
            } catch (error) {
                return resolve({error: true, message: error.message});
            }
        });
    };

    static getList () {
        return new Promise(async resolve => {
            try {
                let listVocab = await VOCABULARY_COLL.find();
                if(!listVocab)
                return resolve({error: true, message: ' Khong hop le'});

                return resolve ({ error: false, data: listVocab});
            
            } catch (error) {
                return resolve({error: true, message: error.message});

            }
        })
    }
    static getInfo ({vocabID}) {
        return new Promise( async resolve => {
            try {
                if(!ObjectID.isValid(vocabID))
                return resolve({error: true, message: 'khong hop le'});
                let infoVocab = await VOCABULARY_COLL.findById(vocabID);
                if(!infoVocab) 
                return resolve ({ error: true, message: 'Khong the tim thay'})

                return resolve({error: false, data: infoVocab});
            } catch (error) {
                return resolve({error: true, message: error.message});
            }
        });
    }
    //Sửa thông tin từ vựng
    static Update({vocabID, english, image, tiengvietese, sound}) {
        return new Promise(async resolve => {
            try {
                if (!ObjectID.isValid(vocabID))
                return resolve({ error: true, message: 'khong hop le' });
                let dataUpdate ={
                    english, image, tiengvietese, sound
                }
                // if(file){
                //     dataUpdate.file = file;
                // }
                // console.log(file);
                let infoAfterUpdate = await VOCABULARY_COLL.findByIdAndUpdate(vocabID, dataUpdate);

                if (!infoAfterUpdate)
                    return resolve({ error: true, message: 'Khong the sua từ vựng' });

                return resolve({ error: false, data: infoAfterUpdate });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }
    //Xóa từ vựng
    static remove({ vocabID }) {
        return new Promise(async resolve => {
            try {
                let infoAfterRemove = await VOCABULARY_COLL.findByIdAndDelete(vocabID);
                if (!infoAfterRemove)
                    return resolve({ error: true, message: 'khong the xoa khoa hoc' });

                if (!ObjectID.isValid(vocabID))
                    return resolve({ erorr: true, message: 'khong hop le' });
                // let infoExamRemove = await EXAM_COLL.deleteMany({ subject: subjectID })
                return resolve({ error: false, data: infoAfterRemove })
            }
            catch (error) {
                return resolve({ erorr: true, message: error.message });
            }
        });
    }
}