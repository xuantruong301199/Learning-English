const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UnitSchema = new Schema({
    
    name: String,

    //Hình
    image: String,

    //Đoạn văn
    paragraph: String,

    //Ngày tạo
    dateCreate:{
        type: Date,
        default: Date.now()
    },
    
    //Người tạo
    course:{
        type: Schema.Types.ObjectId,
        ref: "course"
    },

    //Người tạo
    owner:{
        type: Schema.Types.ObjectId,
        ref: "user"
    },
});


const UNIT_MODEL = mongoose.model('unit',UnitSchema);
module.exports = UNIT_MODEL;