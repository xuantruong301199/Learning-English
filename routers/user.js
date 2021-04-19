const route             = require('express').Router();
const USER_MODEL       = require('../models/user');

//TRANG ĐĂNG KÝ
// route.get('/register', async (req, res) => {
//     renderToView(req, res, 'pages/register', { })
// })

route.post('/register', async (req, res) => {
    let {email, fullname, password} = req.body;
    let infoUAfterInsert = await USER_MODEL.register({ email, fullname, password });
    return res.redirect("/");
})

route.post('/login', async (req, res) => {
    let {email, password} = req.body;
    let userLogin = await USER_MODEL.signIn({ email, password });
    console.log(userLogin);

    if(userLogin.error){
        return res.json(userLogin);
    }
    //Gán thông tin user đăng nhập vào session
    req.session.token = userLogin.data.token; //gán token đã tạo cho session
    req.session.email = req.body.email;
    req.session.user = userLogin.data;
    res.json(userLogin);
})

module.exports = route;