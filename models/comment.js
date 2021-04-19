 const ObjectID = require('mongoose').Types.ObjectId;
 const COMMENT_COLL = require('../databases/comment-coll');
 
 module.exports = class Comment extends COMMENT_COLL{

    static insert({name, content})
    {
       return new Promise (async resolve =>{
            try {
               if(!name)
               return resolve({error: true, message:'Khong hop le'});

               let infoAfterInsert = new COMMENT_COLL({name, content});
               let saveDataInsert = await infoAfterInsert.save();

               if(!saveDataInsert)
               return resolve({error: true, message: 'Khong the them'});
               resolve({error: false, data: infoAfterInsert});

            } catch (error) {
               return resolve({error: true, message:error.message});
            }
       });
    }
 }
