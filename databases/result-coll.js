
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultSchema = new Schema({

    //Người dùng 
    user:{
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    //bộ đề
    exam: {
        type: Schema.Types.ObjectId,
        ref : "exam"
    },
    //Điểm số
    point: Number,

    //Câu trả lời đúng, câu trả lời sai
    // questionTrue: Number,

    // questionFalse: Number,
    //câu trả lời đúng 
    answerRight: Number,


    //Nhận xét
    comment: ObjectID,

    //Ngày tạo
    dateCreate:{
        type: Date,
        default: Date.now()
    }, 

    //Người tạo
    owner:{
        type: Schema.Types.ObjectId,
        ref: "user"
    },


    
});

const RESULT_MODEL = mongoose.model('result',ResultSchema);
module.exports = RESULT_MODEL;