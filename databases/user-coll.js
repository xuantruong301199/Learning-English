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

    //Email
    email: { type: String, required: true, unique: true },
    
    // * 1. Admin
    // * 0. User
    // * 100. Super Admin
    // */
    role: { type: Number, default: 0 },

});

const USER_MODEL = mongoose.model('user', UserSchema);
module.exports = USER_MODEL;