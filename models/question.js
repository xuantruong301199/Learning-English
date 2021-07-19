const ObjectID = require('mongoose').Types.ObjectId;
const QUESTION_COLL = require('../databases/question-coll');
const EXAM_COLL = require('../databases/exam-coll');

module.exports = class question extends QUESTION_COLL {
    static insert({ name, image, answer, examID, correct }) {
        return new Promise(async resolve => {
            try {
                if (!ObjectID.isValid(examID))
                    return resolve({ error: true, message: 'khong hop le' });

                let checkExistExamID = await EXAM_COLL.findById(examID)
                if (!checkExistExamID)
                    return resolve({ error: true, message: 'Khong ton tai' });
                let arrAnswer = answer.split(',');

                let elementNull = '';

                arrAnswer = arrAnswer.filter(function(element) {
                    return element !== elementNull
                })
                let dataInsert = {
                    name: name,
                    answer: arrAnswer,
                    correct,
                }

                if (examID && ObjectID.isValid(examID)) {
                    dataInsert.exam = examID;
                }
                if (image) {
                    dataInsert.image = image;
                }
                let infoAfterInsert = new QUESTION_COLL(dataInsert);
                let saveDataInsert = await infoAfterInsert.save();

                if (!saveDataInsert)
                    return resolve({ error: true, message: "cannot_insert" });
                return resolve({ error: false, data: infoAfterInsert });
                let arrayExamHaveQuestion = await EXAM_COLL.findByIdAndUpdate(examID, {
                    $push: { question: infoAfterInsert._id }
                }, { new: true })
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }
    static getInfo({ questionID }) {
        return new Promise(async resolve => {
            try {
                let infoQuestion = await QUESTION_COLL.findById(questionID);
                if (!infoQuestion)
                    return resolve({ error: true, message: 'khong xuat tt ch' });

                if (!ObjectID.isValid(questionID))
                    return resolve({ error: true, message: 'Khong hop le' });

                return resolve({ error: false, data: infoQuestion });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }
    static getList() {
        return new Promise(async resolve => {
            try {
                let listQuestion = await QUESTION_COLL.find();

                if (!listQuestion)
                    return resolve({ error: true, message: 'khong xuat ds ch' });

                return resolve({ error: false, data: listQuestion });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }
    static update({ questionID, name, image, answer, examID }) {
        return new Promise(async resolve => {
            try {
                let dataUpdate = { name, image, answer, examID };
                let updateQuestion = await QUESTION_COLL.findByIdAndUpdate(questionID, dataUpdate);

                if (!updateQuestion)
                    return resolve({ error: true, message: 'khong xuat ds ch' });

                if (!ObjectID.isValid(questionID) || !ObjectID.isValid(examID) || !ObjectID.isValid(userID))
                    return resolve({ error: true, message: 'khong hop le' });

                return resolve({ error: false, data: updateQuestion });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }
    static remove({ questionID }) {
        return new Promise(async resolve => {
            try {

                let removeQuestion = await QUESTION_COLL.findByIdAndDelete(questionID);

                if (!removeQuestion)
                    return resolve({ error: true, message: 'khong xuat ds ch' });

                if (!ObjectID.isValid(questionID))
                    return resolve({ error: true, message: 'khong hop le' });

                return resolve({ error: false, data: removeQuestion });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }
}