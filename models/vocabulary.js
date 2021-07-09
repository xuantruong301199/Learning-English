const ObjectID = require('mongoose').Types.ObjectId;
const VOCABULARY_COLL = require('../databases/vocabulary-coll');

module.exports = class vocabulary extends VOCABULARY_COLL {

    static insert ({english, image, tiengvietese, spelling, unit}){
        return new Promise(async resolve => {
            try {
                if(!ObjectID.isValid(unit))
                return resolve({error: true, message: 'params_invalid'});

                let infoInsert = new VOCABULARY_COLL({ english, image, tiengvietese, spelling, unit});
                
                let saveDataInsert = await infoInsert.save();

                if (!saveDataInsert)
                return resolve({error: true, message:' Khong the them '});

                return resolve({ error: false, data: infoInsert});
                
            } catch (error) {
                return resolve({error: true, message: error.message});
            }
        });
    };

    static getList ({ unitID }) {
        return new Promise(async resolve => {
            try {

                let listVocab = await VOCABULARY_COLL.find({ unit: unitID });

                if(!listVocab)
                return resolve({error: true, message: 'fail'});

                return resolve ({ error: false, data: listVocab });
            
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
    static Update({numerical, vocabID, english, image, tiengvietese}) {
        return new Promise(async resolve => {
            try {
                if (!ObjectID.isValid(vocabID))
                return resolve({ error: true, message: 'khong hop le' });
                let dataUpdate ={
                    numerical,english, image, tiengvietese, spelling
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