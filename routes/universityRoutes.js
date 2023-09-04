const express = require('express')
const app = express()
const {authAccounts} = require('../middlewares/auth')
const { canModify } = require('../middlewares/roles')
const router = express.Router()

const {
    postOneUniversityController,
    updateOneUniversityController,
    deleteOneUniversityController,
    getOneUniversityController,
    getAllUniversitiesController
} = require('../controllers/universityController')


//GET ALL
exports.getAllUniversities = router.get('/api/university',authAccounts, getAllUniversitiesController)
//GET ONE
exports.getOneUniversity = router.get('/api/university/:universityId',authAccounts, getOneUniversityController)
//DELETE ONE
exports.deleteOneUniversity = router.delete('/api/university/:universityId',authAccounts,canModify('Admin'), deleteOneUniversityController)
//UPDATE ONE
exports.updatedOneUniversity = router.patch('/api/university/:universityId',authAccounts,canModify('Admin'), updateOneUniversityController)
//POST ONE
exports.postOneUniversity = router.post('/api/university/addnewuniversity',authAccounts,canModify('Admin'), postOneUniversityController)


// the permissions are like the following 
// if the role is admin then next if not return json not authorized 




