const ObjectID = require('mongoose').Types.ObjectId;
const RESULT_COLL = require('../databases/result-coll');
const EXAM_COLL = require('../databases/exam-coll');
const USER_COLL = require('../databases/user-coll');
module.exports = class result extends RESULT_COLL{
    static insert(userID , point, answerRight, comment, examID){
    return new Promise(async resolve  => {
        try {
            let {userID , point, answerRight, comment}

            if(!ObjectId.isValid(userID)|| !point ||!ObjectId.isValid(examID) || !answerRight )
            return resolve({error: true , message:'Khong hop le'});

            if(examID && ObjectID.isValid(examID)){
                dataInsert.exam = examID;
            }
            let infoAfterInsert = new RESULT_COLL(userID , point, answerRight, comment);
            let saveDataInsert = await infoAfterInsert.save();

            if (!saveDataInsert)
            return resolve({error: false, message: 'Khong the them diểm'});
            resolve({error: false, message:error.message});

            let arrResultOfExam = await EXAM_COLL.findByIdAndUpdate(examID, {
                $push: { result: infoAfterInsert._id }
            }, {new: true})
            
        } catch (error) {
            return resolve({error: true, message:error.message});
        }

    });
}
}