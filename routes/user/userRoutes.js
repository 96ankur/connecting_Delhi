const express=require('express');
const router=express.Router();
const multer=require('multer');
const auth = require('../../middleware/auth');
// const cleancache = require('../../middleware/cleanCache');

const userSignup=require('./userSignup');
const userLogin=require('./userLogin');
const otpVerify=require('./otpVerify');
const registerComplaints=require('./registerCompalints');
const forgetPasswordMail=require('./forgetPassMail');
const forgetPasswordUrl=require('./forgetPassUrl');
const dispComplaints=require('././dispComplaints');
const changeUserPassword=require('./changeUserPassword');
const resendOtp = require('./resendOtp');
const sorting = require('./sorting');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now()+'-'+file.originalname)
    }
});
// const fileFilter=(req, file, cb)=>{
//     if(file.mimetype=='image/jpeg'||file.mimetype == 'image/png'){
//         cb(null, true);
//     }else{
//         cb(new Error('sorry'),true);
//     }
// }
const upload=multer({
    storage: storage//,
    // limits: {
    // fileSize: 1024 * 1024 * 5
    // },
    // fileFilter:fileFilter
});


router.post('/userSignup',userSignup.userSignup);
router.post('/otpVerify', auth,otpVerify.otpVerify) //it will verify otp when user enters otp and click on verify otp button
router.post('/userLogin',userLogin.userLogin);
router.post('/registerComplaints', auth ,/*cleancache,*/upload.single('image'),registerComplaints.registerComplaints);
router.post('/forgetPasswordMail',forgetPasswordMail.forgetPasswordMail)  // it will send an URL to entered email for changing password
router.post('/forgetPasswordUrl',forgetPasswordUrl.forgetPasswordUrl)  // it will lead to user to another component for changing password
router.post('/dispComplaints', auth, dispComplaints.dispComplaints);
router.post('/changeUserPassword', auth, changeUserPassword.changeUserPassword);
router.get('/resendOtp',auth,resendOtp.resendOtp);
router.post('/sorting',auth,sorting.sorting);


module.exports = router;