const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionSchema = new Schema({
    //Tên câu hỏi
    name:String,

    //Hình
    image: String,

    //Câu trả lời ABCD
    answer: [{
        type: String,
    }],

    //Đề kiểm tra
    exam: {
        type: Schema.Types.ObjectId,
        ref: "exam",
    
    },
    point: String,

    correct: Number,
    //Ngày tạo
    dateCreate:{
        type: Date,
        default: Date.now()
    }, 

    //Người tạo
    author: {
        type: Schema.Types.ObjectId,
        ref : "user"
    },

});

const QUESTION_MODEL = mongoose.model('question',QuestionSchema);
module.exports = QUESTION_MODEL;