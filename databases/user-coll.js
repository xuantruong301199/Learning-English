
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    //Tên đăng nhập 
    // username: {
    //     id: String,
    //     email: String,
    // },

    //Mật khẩu
    password: String,

    //Họ tên
    fullname: String,

    //Hình đại diện
    avatar: String,

    //Ngày sinh
    birthday: Date,

    //Địa chỉ
    address: String,

    //Sdt
    phone: String,

    //Email
    email: String,

    //Trạng thái hoạt động
    status:{
        type: Number,
        default: 0 
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

const USER_MODEL = mongoose.model('user',UserSchema);
module.exports = USER_MODEL;