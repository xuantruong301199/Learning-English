const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
    //tên bài kiểm tra
    name: String,

    //Bài 
    unit:{
        type: Schema.Types.ObjectId,
        ref: "unit"
    },
    //Câu hỏi
    question: String,

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

const EXAM_MODEL = mongoose.model('exam',ExamSchema);
module.exports = EXAM_MODEL;