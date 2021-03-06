const express = require('express');
const router = express.Router();
const { Chats } = require("../models/Chats");

router.post("/get", (req, res) => {
    
    Chats.findOne({ writer : req.body._id } , (err,msg)=>{
        if(err) return res.json({ success: false, message: 'Error 발생..' })

        return res.json({
            success: true,
            msg: msg
        });
    })
    return; 
});

router.post("/make", (req, res) => {

    Chats.findOne({ writer : req.body.writer } , (err,info)=>{
        if(err) return res.json({ success: false, message: 'Error 발생..' })
        
        if(info){
            Chats.updateOne({writer : req.body.writer}, {msg : req.body.msg}, (err) =>{
                if (err) return res.json({ success: false, message: 'Error' });
                return res.status(200).json({
                    success: true
                });
            })
        }else{
            const chat = new Chats(req.body);
            chat.save((err) => {                                                                                    
                if (err) return res.json({ success: false });
                return res.status(200).json({
                    success: true
                });
            })
        }
    
    })
});




module.exports = router;
