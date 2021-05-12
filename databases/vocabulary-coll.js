const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VocabularySchema = new Schema({

    //Hình 
    image: String,

    //Tiếng anh
    english: String,

    //TV
    tiengvietese: String,

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

const VOCABULARY_MODEL = mongoose.model('vocabulary',VocabularySchema);
module.exports = VOCABULARY_MODEL;