const express = require('express')
const router = express.Router()
const {authAccounts} = require('../middlewares/auth')
const { canModify } = require('../middlewares/roles')
const{
   postOneColleageController,
    updateOneColleageController,
    deleteOneColleageController,
    getOneColleageController,
    getAllColleagesController
} = require('../controllers/colleage-controller')

//GET ALL
exports.getAllColleages = router.get('/api/colleage',authAccounts,getAllColleagesController)
//GET ONE
exports.getOneColleage = router.get('/api/colleage/:colleageId',authAccounts,getOneColleageController )
//DELETE ONE
exports.deleteOneColleage = router.delete('/api/colleage/:colleageId',authAccounts,canModify("Admin"),deleteOneColleageController)
//UPDATE ONE
exports.updatedOneColleage = router.patch('/api/colleage/:colleageId',authAccounts,canModify("Admin"),updateOneColleageController )
//POST ONE
exports.postOneColleage = router.post('/api/colleage/addnewcolleage',authAccounts,canModify("Admin"),postOneColleageController)





