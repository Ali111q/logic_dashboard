const express = require('express')
const router = express.Router()
const {authAccounts} = require('../middlewares/auth')
const { canModify } = require('../middlewares/roles')
const{
   postOneVideoController,
    updateOneVideoController,
    deleteOneVideoController,
    getOneVideoController,
    getAllVideosController
} = require('../controllers/video-controller')


//GET ALL
exports.getAllVideos = router.get('/api/video',authAccounts,getAllVideosController)
//GET ONE
exports.getOneVideo = router.get('/api/video/:videoId',authAccounts,getOneVideoController )
//DELETE ONE
exports.deleteOneVideo = router.delete('/api/video/:videoId',authAccounts,canModify("Admin"),deleteOneVideoController)
//UPDATE ONE
exports.updatedOneVideo = router.patch('/api/video/:videoId',authAccounts,canModify("Admin"),updateOneVideoController )
//POST ONE
exports.postOneVideo = router.post('/api/video/addnewvideo',authAccounts,canModify("Admin"),postOneVideoController)





