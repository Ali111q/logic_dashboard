const express = require('express')
const router = express.Router()

const {authAccounts} = require('../middlewares/auth')

const { canModify } = require('../middlewares/roles')

const{ postOneBranchController,updateOneBranchController,deleteOneBranchController,getOneBranchController,getAllBranchsController} = require('../controllers/branch-controller')


//GET ALL
exports.getAllBranchs = router.get('/api/branch',authAccounts,getAllBranchsController)
//GET ONE
exports.getOneBranch = router.get('/api/branch/:branchId',authAccounts,getOneBranchController )
//DELETE ONE
exports.deleteOneBranch = router.delete('/api/branch/:branchId',authAccounts,canModify("Admin"),deleteOneBranchController)
//UPDATE ONE
exports.updatedOneBranch = router.patch('/api/branch/:branchId',authAccounts,canModify("Admin"),updateOneBranchController )
//POST ONE
exports.postOneBranch = router.post('/api/branch/addnewbranch',authAccounts,canModify("Admin"),postOneBranchController)





