
const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CourseSchema = new Schema({

    // Tên khóa học
    name: String,

    //Hình
    image: String,

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

    //Lượt xem
    view: [{
        type: Schema.Types.ObjectId,
        ref : "user"
    }],

    //Bình luận
    comment: {
        type: Schema.Types.ObjectId,
        ref : "comment"
    },

    //Mô tả
    description: String,

    //Tài liệu
    document: [{
        type: Schema.Types.ObjectId,
        ref : "document"
    }],

    //Trình độ
    level:{
        type: Number,
        default: 0
    },

    //Trạng thái hoạt động
    status: {
        type: Number,
        default:  0
    }

});
const COURSE_MODEL = mongoose.model('course', CourseSchema);
module.exports  = COURSE_MODEL;