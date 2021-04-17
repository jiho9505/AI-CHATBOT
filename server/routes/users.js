const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

router.get("/auth", auth, (req, res) => {
    res.status(200)
        .json({
        _id: req.user._id,
        isAuth: true,
        nickname: req.user.nickname,
        role: req.user.role,
        
    })

});

router.post("/register", (req, res) => {
    User.findOne({ nickname : req.body.nickname } , (err,userInfo)=>{
        if(err) return res.json({ success: false, message: 'Error 발생..' })
        if(userInfo) return res.json({ success: false, message: '중복된 닉네임이 있습니다' })

        const user = new User(req.body);
            user.save((err, doc) => {                                                                                    
                if (err) return res.json({ success: false, message: '중복된 E-mail이 있습니다' });
                return res.status(200).json({
                    success: true
                });
    });
    })
    
});

router.post("/info", (req, res) => {
    User.findOne({ _id : req.body._id } , (err,userInfo)=>{
        if(err) return res.json({ success: false })
        return res.json({ success: true, userInfo })
    
})
})



router.post("/login", (req, res) => {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (!user)
                return res.json({
                    loginSuccess: false,
                    message: "E-mail을 확인해주세요."
                });

            user.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch)
                    return res.json({ loginSuccess: false, message: "비밀번호를 확인해주세요" });

                user.generateToken((err, user) => {
                    if (err) return res.send(err);
        
                    res.cookie("w_auth", user.token , { httpOnly: true ,  secure: process.env.NODE_ENV === 'production'  })
                        .status(200)
                        .json({
                            loginSuccess: true, userId: user._id
                        });
                });
            });
        });
    });

router.get("/logout", auth, (req, res) => {
        User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
        });
    });
});




             

module.exports = router;
