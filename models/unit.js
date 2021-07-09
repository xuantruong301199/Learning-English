const ObjectID = require('mongoose').Types.ObjectId;
const UNIT_COLL = require('../databases/unit-coll')

module.exports = class unit extends UNIT_COLL {

    static insert({ name, image, course }) {
        return new Promise(async resolve => {
            try {

                if (!name && !ObjectID.isValid(course))
                    return resolve({ error: true, message: 'Khong hop le' });
                
                let dataInsert = {
                    name,
                    course
                }

                if (image) {
                    dataInsert.image = image;
                }

                let infoAfterInsert = new UNIT_COLL(dataInsert);
                let saveDataInsert = await infoAfterInsert.save();

                if (!saveDataInsert) return resolve({ error: true, message: 'fail' });
                resolve({ error: false, data: infoAfterInsert })
            } catch (error) {
                resolve({ error: true, message: error.message })
            }
        });
    }
    static getInfo({ unitID }) {
        return new Promise(async resolve => {
            try {
                if (!ObjectID.isValid(unitID))
                    return resolve({ error: true, message: 'Khong hop le' });

                let infoUnit = await UNIT_COLL.findById(unitID);
                if (!infoUnit)
                    return resolve({ error: true, message: 'khong the xem thong tin ' });

                return resolve({ error: false, data: infoUnit });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
    static getList({ courseID }) {
        return new Promise(async resolve => {
            try {
                let listUnit;
                // if (!ObjectID.isValid(courseID)) {
                //     return resolve({ error: true, message: 'params_invalid' });
                // }

                if (ObjectID.isValid(courseID)) {
                    listUnit = await UNIT_COLL.find({ course: courseID });
                } else {
                    listUnit = await UNIT_COLL.find();
                }

                if (!listUnit)
                    return resolve({ error: true, message: 'can_not_get_list' });

                return resolve({ error: false, data: listUnit });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }
    static Update({ unitID, name, image }) {
        return new Promise(async resolve => {
            try {
                let dataUpdate = {
                    name,
                    image,
                    
                }
                if (!ObjectID.isValid(unitID))
                    return resolve({ error: true, message: 'khong hop le' });

                let infoAfterUpdate = await UNIT_COLL.findByIdAndUpdate(unitID, dataUpdate);

                if (!infoAfterUpdate)
                    return resolve({ error: true, message: 'Khong the sua' });
                return resolve({ error: false, data: infoAfterUpdate });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
    static remove({ unitID }) {
        return new Promise(async resolve => {
            try {
                let infoAfterRemove = await UNIT_COLL.findByIdAndDelete(unitID);
                console.log(infoAfterRemove);
                if (!ObjectID.isValid(unitID))
                    return resolve({ error: true, message: 'khong hop le' });


                if (!infoAfterRemove)
                    return resolve({ error: true, message: 'khong the xoa ' });

                return resolve({ error: false, data: infoAfterRemove });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
}