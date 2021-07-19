const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VocabularySchema = new Schema({

    numerical: String,
    
    //Hình 
    image: String,

    //Nghe 
    listen: String,

    //Tiếng anh
    english: String,

    //TV
    tiengvietese: String,

    //Âm thanh 
    spelling: String,

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