const ObjectID = require('mongoose').Types.ObjectId;
const PARAGRAPH_COLL = require('../databases/paragraph-coll');

module.exports = class paragraph extends PARAGRAPH_COLL {
    static insert({name, image, english, tiengvietese}){
        return new Promise( async resolve => {
            try {
                let dataInsert ={
                   name, image, english, tiengvietese
                }
                if(!name)
                    return resolve({error : true, message:'Khong hop le'});

                
                let infoAfterInsert = new PARAGRAPH_COLL({ dataInsert });
                let saveDataInsert = await infoAfterInsert.save();

                if(!saveDataInsert)
                    return resolve({ error: false , message: 'Khong the them'});
                    resolve({ error: false, message: dataInsert});
        
                
            } catch (error) {
                return resolve({erro: true, message: error.message});
            }
        });
    }
}