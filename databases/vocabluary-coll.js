const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VocabluarySchema = new Schema({

    //Hình 
    image: String,

    //Tiếng anh
    english: String,

    //TV
    vietnamese: String,

    //Âm thanh 
    sound: String,

    unit:{
        type: Schema.Types.ObjectId,
        ref :"unit"
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

    //Nghe
    //listen:String,
});

const VOCABLUARY_MODEL = mongoose.model('vocabluary',VocabluarySchema);
module.exports = VOCABLUARY_MODEL;