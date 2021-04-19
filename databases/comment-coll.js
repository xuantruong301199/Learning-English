 const mongoose  = require('mongoose');
 const Schema = mongoose.Schema;

const CommentSchema = new Schema({

    //Họ tên
    fullname: String,

    //Nội dung bình luận
    content: String,

    //Khóa học
    course: String,
});

const COMMENT_MODEL = mongoose.model('comment',CommentSchema);
module.exports = COMMENT_MODEL; 
