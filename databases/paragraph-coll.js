const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParagraphSchema = new Schema({

    //tên đoạn văn
    name: String,
    //Hình
    image: String,
    
    //Tiếng anh
    english: String,

    //Tiếng việt
    tiengvietese: String,

    //Bài học
    unit:{
        type: Schema.Types.ObjectId,
        ref: "unit"
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
const PARAGRAPH_MODEL = mongoose.model('paragraph',ParagraphSchema);
module.exports = PARAGRAPH_MODEL;