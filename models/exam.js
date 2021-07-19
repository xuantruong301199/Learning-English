const ObjectID = require('mongoose').Types.ObjectId;
const EXAM_COLL = require('../databases/exam-coll');

module.exports = class exam extends EXAM_COLL {

    static insert({ name, courseID }) {
        return new Promise(async resolve => {
            try {
                if (!name || !courseID)
                    return resolve({ error: true, message: 'khong hop le' });

                let dataInsert = {
                    name
                };

                let infoAfterInsert = new EXAM_COLL(dataInsert);
                let saveAfterInsert = await infoAfterInsert.save();
                if (!saveAfterInsert)
                    return resolve({ error: true, messsage: 'Khong the them' });
                resolve({ error: false, message: infoAfterInsert });


            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }
    static getInfo({ examID }) {
        return new Promise(async resolve => {
            try {
                if (!ObjectID.isValid(examID))
                    return resolve({ error: true, message: 'Khong hop le' })
                let infoExam = await EXAM_COLL.findById(examID);
                if (!infoExam)
                    return resolve({ error: true, message: 'Khong the xuat ra thong tin bai kiem tra' });
                console.log(infoExam);
                return resolve({ error: false, data: infoExam })

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }
    static getList() {
        return new Promise(async resolve => {
            try {
                let listExam = await EXAM_COLL.find();
                if (!listExam)
                    return resolve({ error: true, message: 'Khong thay danh sach' });

                return resolve({ error: false, data: listExam });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
    static update({ examID, name }) {
        return new Promise(async resolve => {
            try {
                let dataUpdate = { name };
                let updateExam = await EXAM_COLL.findByIdAndUpdate(examID, dataUpdate);
                if (!updateExam)
                    return resolve({ error: true, message: 'khong the sua bai kiem tra' });

                if (!ObjectID.isValid(examID) || !name)
                    return resolve({ error: true, message: 'Khong hop le' });

                return resolve({ error: false, data: updateExam });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
    static remove({ examID }) {
        return new Promise(async resolve => {
            try {
                let infoExamRemove = await EXAM_COLL.findByIdAndDelete(examID);

                if (!infoExamRemove)
                    return resolve({ error: true, message: 'khong the xoa' });

                if (!ObjectID.isValid(examID))
                    return resolve({ error: true, message: ' Khong hop le' });

                return resolve({ error: false, data: infoExamRemove });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
}