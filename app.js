const express           = require('express');   //Thư viện express
const app               = express();    // Khởi tạo một app mới sử dụng module express
const bodyParser        = require('body-parser');  //thư viện body-parser dùng cho phương thức Post
const mongoose          = require('mongoose'); 
const expressSession    = require('express-session');
const redis             = require("redis");
const connectRedis      = require('connect-redis');
const { renderToView }  = require('./utils/renderToView');

const RedisStore = connectRedis(expressSession);

const redisClient = redis.createClient({
    port: 6379,
    host: 'localhost'
});
const PORT = process.env.PORT || 9000;

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Cấu hình ejs
app.set('view engine', 'ejs');
app.set('views', './views');

const USER_ROUTING = require('./routers/user')
const COURSE_ROUTING = require('./routers/course');
const UNIT_ROUTING = require('./routers/unit');
const COMMENT_ROUTING = require('./routers/comment');
const EXAM_ROUTING = require('./routers/exam');
const PARAGRAPH_ROUTING = require('./routers/paragraph');
const QUESTION_ROUTING = require('./routers/question');

app.use(expressSession({
    store: new RedisStore({client: redisClient}),
    secret: 'learning-english',
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 10 * 60 * 1000 * 100
    }
}));

app.use('/user', USER_ROUTING);
app.use('/course', COURSE_ROUTING);
app.use('/unit', UNIT_ROUTING);
app.use('/comment', COMMENT_ROUTING);
app.use('/exam', EXAM_ROUTING);
app.use('/paragraph', PARAGRAPH_ROUTING);
app.use('/question', QUESTION_ROUTING);


app.get('/', async function(req, res){
    renderToView(req, res, "pages/home", { }); 
});

app.get('/register',function(req, res){
    res.render("pages/register");
})

app.get('/logout',function(req, res){
    req.session.token = undefined;
    return res.redirect('/');
})

 app.get('/dashboard', function(req, res){
     renderToView(req, res, "pages/dashboard", { })
 })

 app.get('/result', function(req, res){
    renderToView(req, res, "pages/result", { })
})
app.get('/add-course', function(req, res){
    renderToView(req, res, "pages/add-course", { })
})

app.get('/add-exam', function(req, res){
    renderToView(req, res, "pages/add-exam", { })
})

app.get('/add-question', function(req, res){
    renderToView(req, res, "pages/add-question", { })
})

app.get('/list-result-exam', function(req, res){
    renderToView(req, res, "pages/list-result-exam", { })
})

app.get('/list-exam', function(req, res){
    renderToView(req, res, "pages/list-exam", { })
})
app.get('/exam', function(req, res){
    renderToView(req, res, "pages/exam", { })
})
app.get('/vocabluary', function(req, res){
    renderToView(req, res, "pages/vocabluary", { })
})
app.get('/paragraph', function(req, res){
    renderToView(req, res, "pages/paragraph", { })
})
app.get('/result', function(req, res){
    renderToView(req, res, "pages/result", { })
})

const uri = 'mongodb://localhost/learning_english';

mongoose.set('useCreateIndex', true); //ẩn cảnh báo
mongoose.set('useUnifiedTopology', true); // ẩn cảnh báo

mongoose.connect(uri, { useNewUrlParser: true });

mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
});

