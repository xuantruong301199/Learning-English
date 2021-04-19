const ObjectID = require('mongoose').Types.ObjectId;
const COURSE_COLL = require('../databases/course-coll');

// const UNIT_COLL = require('../databases/unit-coll');

module.exports = class course extends COURSE_COLL {

    static insert({ name, image, description }) {
        return new Promise(async resolve => {
            try {

                let dataInsert = {
                    name, image, description
                }
                console.log({ name, image, description });

                if (!name)
                    return resolve({ error: true, message: 'Khong hop le' });

                let infoAfterInsert = new COURSE_COLL(dataInsert);
                let saveDataInsert = await infoAfterInsert.save();

                if (!saveDataInsert)
                    return resolve({ error: true, message: 'khong the insert' });
                resolve({ error: false, data: infoAfterInsert });
            }
            catch (error) {
                return resolve({ error: true, message: error.message })
            }
        });
    }
    // lấy thông tin khóa học
    static getInfo({ courseID }) {
        return new Promise(async resolve => {
            try {
                if (!ObjectID.isValid(courseID))
                    return resolve({ error: true, message: 'id khoa hoc khong hop le' });
                let infoCourse = await COURSE_COLL.findById(courseID);
                console.log(infoCourse);
                if (!infoCourse)
                    return resolve({ error: true, message: 'khong the lay thong tin khoa hoc' });
                console.log(courseID);


                return resolve({ error: false, data: infoCourse });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }

        });
    }
    //Lấy danh sách khóa học
    static getList() {
        return new Promise(async resolve => {
            try {
                let listCourse = await COURSE_COLL.find();
                if (!listCourse)
                    return resolve({ error: true, message: 'khong the lay danh sach' });

                return resolve({ error: false, data: listCourse });
            } catch (error) {
                return resolve({ error: true, message: erorr.message });

            }
        });
    }
    //Sửa thông tin khóa học
    static Update({courseID, name, image, description}) {
        return new Promise(async resolve => {
            try {
                if (!ObjectID.isValid(courseID))
                return resolve({ error: true, message: 'khong hop le' });
                let dataUpdate ={
                     name, image, description
                }
                // if(file){
                //     dataUpdate.file = file;
                // }
                // console.log(file);
                let infoAfterUpdate = await COURSE_COLL.findByIdAndUpdate(courseID, dataUpdate);

                 console.log(dataUpdate);

                if (!infoAfterUpdate)
                    return resolve({ error: true, message: 'Khong the sua khoa hoc' });

               
                return resolve({ error: false, data: infoAfterUpdate });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }
    //Xóa khóa học
    static remove({ courseID }) {
        return new Promise(async resolve => {
            try {
                let infoAfterRemove = await COURSE_COLL.findByIdAndDelete(courseID);
                if (!infoAfterRemove)
                    return resolve({ error: true, message: 'khong the xoa khoa hoc' });

                if (!ObjectID.isValid(courseID))
                    return resolve({ erorr: true, message: 'khong hop le' });
                // let infoExamRemove = await EXAM_COLL.deleteMany({ subject: subjectID })
                return resolve({ error: false, data: infoAfterRemove })
            }
            catch (error) {
                return resolve({ erorr: true, message: error.message });
            }
        });
    }
}