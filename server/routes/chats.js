const express = require('express');
const router = express.Router();
const { Chats } = require("../models/Chats");
const { auth } = require("../middleware/auth");

router.post("/", (req, res) => {
    // Chats.findOne({ writer : req.body._id } , (err,msg)=>{
    //     if(err) return res.json({ success: false, message: 'Error 발생..' })
       
    //     return res.json({
    //         success: true,
    //         msg: msg
    //     });
    // })
    return res.json({
                success: true,
           
            });

});

router.post("/make", auth, (req, res) => {
    Chats.findOne({ writer : req.body._id } , (err,msg)=>{
        if(err) return res.json({ success: false, message: 'Error 발생..' })
       
        if(msg){
            Chats.insertMany({ writer : req.body._id }, () => {

            })
        }else{
            const chat = new Chats(req.body);
            chat.save((err, doc) => {                                                                                    
                if (err) return res.json({ success: false, message: '중복된 E-mail이 있습니다' });
                return res.status(200).json({
                    success: true
                });
    });
        }
        return res.json({
            success: true,
            msg: msg
        });
    })

});

// router.post("/", (req, res) => {
//     User.findOne({ nickname : req.body.nickname } , (err,userInfo)=>{
//         if(err) return res.json({ success: false, message: 'Error 발생..' })
//         if(userInfo) return res.json({ success: false, message: '중복된 닉네임이 있습니다' })

        
//     })
    
// });


module.exports = router;
