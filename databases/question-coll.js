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

    //Bài học
    unit:{
        type: Schema.Types.ObjectId,
        ref: "unit"
    },
    //Đề kiểm tra
    exam: {
        type: Schema.Types.ObjectId,
        ref: "exam",
    
    },
    
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

const QUESTION_MODEL = mongoose.model('question',QuestionSchema);
module.exports = QUESTION_MODEL;