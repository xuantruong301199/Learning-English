const express = require("express"); //Thư viện express
const app = express(); // Khởi tạo một app mới sử dụng module express
const bodyParser = require("body-parser"); //thư viện body-parser dùng cho phương thức Post
const mongoose = require("mongoose");
const expressSession = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");
const { renderToView } = require("./utils/renderToView");
const ROLE_ADMIN = require('../Learning-E/utils/checkRole');
const checkActive = require('../Learning-E/utils/checkActive');
const ROLE_SUPER_ADMIN = require('../Learning-E/utils/roleSuperAdmin');
const RedisStore = connectRedis(expressSession);

const redisClient = redis.createClient({
    port: 6379,
    host: "localhost",
});
const PORT = process.env.PORT || 9000;

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Cấu hình ejs
app.set("view engine", "ejs");
app.set("views", "./views");

const USER_ROUTING = require("./routers/user");
const COURSE_ROUTING = require("./routers/course");
const UNIT_ROUTING = require("./routers/unit");
const COMMENT_ROUTING = require("./routers/comment");
const EXAM_ROUTING = require("./routers/exam");
const PARAGRAPH_ROUTING = require("./routers/paragraph");
const QUESTION_ROUTING = require("./routers/question");
const VOCABULARY_ROUTING = require("./routers/vocabulary");
const RESULT_ROUTING = require("./routers/result");


const UNIT_MODEL = require("./models/unit");
const EXAM_MODEL = require("./models/exam");
const COURSE_MODEL = require("./models/course");
const RESULT_MODEL = require("./models/result");
const QUESTION_MODEL = require("./models/question");
const VOCABULARY_MODEL = require("./models/vocabulary");
const PARAGRAPH_MODEL = require("./models/paragraph");

app.use(
    expressSession({
        store: new RedisStore({ client: redisClient }),
        secret: "learning-english",
        saveUninitialized: false,
        resave: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 10 * 60 * 1000 * 100,
        },
    })
);

app.use("/user", USER_ROUTING);
app.use("/course", COURSE_ROUTING);
app.use("/unit", UNIT_ROUTING);
app.use("/comment", COMMENT_ROUTING);
app.use("/exam", EXAM_ROUTING);
app.use("/paragraph", PARAGRAPH_ROUTING);
app.use("/question", QUESTION_ROUTING);
app.use("/vocabulary", VOCABULARY_ROUTING);
app.use("/result", RESULT_ROUTING);

app.get("/", async function(req, res) {
    let listCourse = await COURSE_MODEL.getList();
    renderToView(req, res, "pages/home", { listCourse: listCourse.data });
});

app.get("/register", function(req, res) {
    res.render("pages/register");
});
app.post('/register', async(req, res) => {
    let { email, password, fullname } = req.body;
    let infoUser = await USER_MODEL.register(email, password, fullname);
    if (infoUser.error && infoUser.message == 'email_existed')
        renderToView(req, res, 'pages/home', {});
    return res.redirect('/register');
});
app.post('/login', async(req, res) => {
    //req.session.isLogin = true;
    let { email, password } = req.body;
    let infoUser = await USER_MODEL.signIn(email, password);

    if (infoUser.error)
        return res.json(infoUser);

    // res.cookie('token', infoUser.data.token, { maxAge: 900000 });
    req.session.token = infoUser.data.token; //gán token đã tạo cho session
    req.session.email = req.body.email;
    req.session.user = infoUser.data;

    renderToView(req, res, 'pages/dashboard-admin', { infoUser: infoUser.data })
})
app.get("/logout", function(req, res) {
    req.session.token = undefined;
    return res.redirect("/");
});

app.get("/dashboard", ROLE_ADMIN, async function(req, res) {
    renderToView(req, res, "pages/dashboard", {});
});

app.get("/result", function(req, res) {
    renderToView(req, res, "pages/result", {});
});
app.get("/add-unit", async function(req, res) {
    let listCourse = await COURSE_MODEL.getList();
    console.log({ listCourse });

    renderToView(req, res, "pages/add-unit", { listCourse: listCourse.data });
});

app.get("/add-course", ROLE_SUPER_ADMIN, async function(req, res) {
    let listUnit = await COURSE_MODEL.getList();

    renderToView(req, res, "pages/add-course", { listUnit: listUnit.data });
});

app.get("/begin-exam", ROLE_ADMIN, async function(req, res) {
    let { examID } = req.query;
    let infoExam = await EXAM_MODEL.getInfo({ examID });
    renderToView(req, res, "pages/begin-exam", { infoExam: infoExam.data });
});
app.get("/add-exam", ROLE_ADMIN, async function(req, res) {
    let listExam = await EXAM_MODEL.getList();
    let listCourse = await COURSE_MODEL.getList();
    // let infoCourse = await COURSE_MODEL.getInfo({ courseID });
    renderToView(req, res, "pages/add-exam", {
        listExam: listExam.data,
        listCourse: listCourse.data,
    });
});

app.get("/add-question", ROLE_ADMIN, async function(req, res) {
    let listExam = await EXAM_MODEL.getList();
    let listQuestion = await QUESTION_MODEL.getList();
    renderToView(req, res, "pages/add-question", {
        listExam: listExam.data,
        listQuestion: listQuestion.data,
    });
});

app.get("/add-paragraph", async function(req, res) {
    let listUnit = await UNIT_MODEL.getList({});
    let listPara = await PARAGRAPH_MODEL.getList({});
    renderToView(req, res, "pages/add-paragraph", {
        listUnit: listUnit.data,
        listPara: listPara.data,
    });
});
app.get("/add-vocabulary", async function(req, res) {
    let listUnit = await UNIT_MODEL.getList({});
    renderToView(req, res, "pages/add-vocabulary", { listUnit: listUnit.data });
});

// app.get("/list-result-exam", function(req, res) {
//     renderToView(req, res, "pages/list-result-exam", {});
// });
app.get('/result-test-exam', checkActive, async(req, res) => {
    let { resultID } = req.query;
    let { examID } = req.query;
    console.log(resultID, examID)
    let infoResult = await RESULT_MODEL.getInfo({ resultID })
    let infoExam = await EXAM_MODEL.getInfo({ examID })
    renderToView(req, res, 'pages/result-test-exam', { infoResult: infoResult.data, infoExam: infoExam.data });
})
app.get("/list-unit", async function(req, res) {
    let { unitID } = req.query;
    let listUnit = await UNIT_MODEL.getList({})
    let infoUnit = await UNIT_MODEL.getInfo({ unitID })
    renderToView(req, res, "pages/list-unit", { infoUnit: infoUnit.data, listUnit: listUnit.data });
});
app.get("/list-exam", async function(req, res) {
    let { examID } = req.query;
    let listExam = await EXAM_MODEL.getList({})
    let listQuestion = await QUESTION_MODEL.getList({})
    let listResult = await RESULT_MODEL.getList({})
    let infoExam = await EXAM_MODEL.getInfo({ examID })
    renderToView(req, res, "pages/list-exam", { infoExam: infoExam.data, listExam: listExam.data, listQuestion: listQuestion.data, listResult: listResult.data });
});

app.get("/exam", async function(req, res) {
    let listExam = await EXAM_MODEL.getList();
    renderToView(req, res, "pages/exam", { listExam: listExam.data });
});
app.get("/test-exam", async function(req, res) {
    let { examID } = req.query;
    let listQuestion = await QUESTION_MODEL.getList({ examID });
    let infoExam = await EXAM_MODEL.getInfo({ examID });
    renderToView(req, res, "pages/test-exam", {
        infoExam: infoExam.data,
        listQuestion: listQuestion.data,
    });
});
// app.get("/sound", async function(req, res) {
//     let { unitID } = req.query;
//     let infoUnit = await UNIT_MODEL.getInfo({ unitID });
//     let listVocabulary = await VOCABULARY_MODEL.getList({ unitID });
//     renderToView(req, res, "pages/sound", {
//         listVocabulary: listVocabulary.data,
//         infoUnit: infoUnit.data,
//     });
// });
// app.get('/course', async function (req, res) {
//     let { unitID } = req.query;
//     let listCourse = await COURSE_MODEL.getList();
//     renderToView(req, res, "pages/course", { listCourse: listCourse.data});
// })
app.get("/vocabulary", async function(req, res) {
    let { unitID } = req.query;
    let infoUnit = await UNIT_MODEL.getInfo({ unitID });
    let listVocabulary = await VOCABULARY_MODEL.getList({ unitID });
    renderToView(req, res, "pages/vocabulary", {
        listVocabulary: listVocabulary.data,
        infoUnit: infoUnit.data,
    });
});

app.get("/paragraph", async function(req, res) {
    let { unitID } = req.query;
    let infoUnit = await UNIT_MODEL.getInfo({ unitID });
    let listPara = await PARAGRAPH_MODEL.getList({ unitID });
    renderToView(req, res, "pages/paragraph", {
        listPara: listPara.data,
        infoUnit: infoUnit.data,
    });
});
app.get("/list-vocabulary", async function(req, res) {
    let { unitID } = req.query;
    let infoUnit = await UNIT_MODEL.getInfo({ unitID });
    let listVocabulary = await VOCABULARY_MODEL.getList({ unitID });
    console.log({ listVocabulary });
    renderToView(req, res, "pages/list-vocabulary", {
        listVocabulary: listVocabulary.data,
    });
});
// app.get("/sound", async function(req, res) {
//     let { unitID } = req.query;
//     let infoUnit = await UNIT_MODEL.getInfo({ unitID });
//     let listVocabulary = await VOCABULARY_MODEL.getList({ unitID });
//     console.log({ listVocabulary });
//     renderToView(req, res, "pages/vocabulary", {
//         listVocabulary: listVocabulary.data,
//         infoUnit: infoUnit.data,
//     });
// });
app.get("/result", function(req, res) {
    renderToView(req, res, "pages/result", {});
});

// app.get('/unit',async function (req, res) {
//     let listVocab = await VOCABULARY_MODEL.getList();
//     renderToView(req, res, "pages/unit", {listVocab: listVocab.data})
// })

const uri = "mongodb://localhost/learning_english";

mongoose.set("useCreateIndex", true); //ẩn cảnh báo
mongoose.set("useUnifiedTopology", true); // ẩn cảnh báo

mongoose.connect(uri, { useNewUrlParser: true });

mongoose.connection.once("open", () => {
    app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
});