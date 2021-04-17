const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3')
const AWS = require("aws-sdk");
const config = require('../config/key')
const { Board } = require("../models/Board");

const s3 = new AWS.S3({ 
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: config.region
});

const storage = multerS3({ 
    s3: s3,
    bucket: 'capston',
    contentType: multerS3.AUTO_CONTENT_TYPE, 
    acl: 'public-read',
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname }) 
    },
    key: function (req, file, cb) { 
        cb(null, `storeImages/${Date.now()}_${file.originalname}`)
    },
})

var upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        
        return res.json({ success: true, filePath: res.req.file.location })
    })

})



router.get('/', (req, res) => {
    var userId = req.query.id
    var body = {}
   
    
    body.writer = userId
   

    Board.find(body)
        .sort( { createdAt: -1 } )
        .exec((err,result)=>{
                
            if(err)  return res.json({ success: false ,err })
            return res.status(200).json({ success: true, result })
            })
    })   

router.post('/', (req, res) => {

    var board = new Board(req.body)

    board.save((err,doc) => {
        if(err) return res.json({ success: false ,err })
        return res.status(200).json({ success: true, doc})
    })
})




module.exports = router;