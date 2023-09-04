const express = require('express')
const {authAccounts} = require('../middlewares/auth')
const router = express.Router()
const { check } = require('express-validator')
const { postSignUp, postLogIn, activeCourse, nonActiveCourse, getAllAccounts, getOneAccount, patchUpdateUser } = require('../controllers/user-controller')

exports.postAdminSignUp = router.post('/api/signup', [
    check("email", "credintional invaild")
        .isEmail(),
    check("password", "credintional invalid")
        .isLength({ min: 10 })
        .withMessage('Password must be at least 10 characters')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/\d/)
        .withMessage('Password must contain at least one number'),
    check("username", "credintional invaild")
        .isLength({ min: 6 })
        .withMessage('Username must be at least 6 characters')
        .matches(/[A-Z]/)
        .withMessage('Username must contain at least one uppercase letter')
        .matches(/\d/)
        .withMessage('Username must contain at least one number')

], postSignUp)

// login route 
exports.postlogin = router.post('/api/login', postLogIn)

//get all accounts route 
exports.getAllAccounts = router.get('/api/usersaccounts',authAccounts,getAllAccounts)

// get one account by id 
exports.getOneAccount = router.get('/api/accounts/:currentUserId',authAccounts,getOneAccount)


//active user course route 
exports.activeUserCourse = router.patch('/api/activeusercourse/:userId/:courseId',authAccounts,activeCourse)

//Non-Active user course route 

exports.nonActiveUserCourse = router.patch('/api/nonactiveusercourse/:userId/:courseId',authAccounts,nonActiveCourse)

// user information route 

exports.patchUpdateUser = router.patch('/api/userinformation/:userSecurityInformation',authAccounts,patchUpdateUser)