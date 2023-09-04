const { Course } = require('../models/course');
const { Video } = require('../models/video');

// Get all videos
const getAllVideosController = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.json(videos);
  } catch (err) {
    return res.status(404).json({ msg: err });
  }
};

// Get one video
const getOneVideoController = async (req, res) => {
  const videoId = req.params.videoId;
  try {
    const video = await Video.findById(videoId);
    if (video) {
      return res.json({ data: video });
    }
    return res.json({ msg: 'There is no data here' });
  } catch (error) {
    return res.json({ msg: error });
  }
};

// Delete one video
const deleteOneVideoController = async (req, res) => {
  const videoId = req.params.videoId;
  try {
    const video = await Video.findById(videoId);
    if (!video) {
      return res.json({ msg: 'There is no video with this ID' });
    }
    const courseId = video.videoCourse;
    await Course.findByIdAndUpdate(courseId, { $pull: { courseVideos: videoId } });
    await Video.findByIdAndDelete(videoId);
    return res.json({ msg: 'Video deleted successfully' });
  } catch (error) {
    return res.json({ error });
  }
};

// Update one video
const updateOneVideoController = async (req, res) => {
  const videoId = req.params.videoId;
  try {
    const updatedVideo = await Video.findByIdAndUpdate(videoId, req.body);
    return res.json({ updatedVideo });
  } catch (error) {
    return res.json(error);
  }
};

// Create one video
const postOneVideoController = async (req, res) => {
  const {
    videoUrl,
    videoTitle,
    videoDescription,
    videoImgUrl,
    videoSequence,
    videoChapter,
    videoDuration,
    isVideoFree,
    courseId
  } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    const newVideo = await Video.create({
      videoImgUrl,
      videoTitle,
      videoDescription,
      videoUrl,
      videoSequence,
      videoDuration,
      isVideoFree,
      videoChapter,
      videoCourse: course._id
    });
    course.courseVideos.push(newVideo._id);
    await course.save();
    return res.json({ message: 'New video added successfully', video: newVideo });
  } catch (error) {
    return res.json({ msg: `This is an error: ${error}` });
  }
};

module.exports = {
  postOneVideoController,
  updateOneVideoController,
  deleteOneVideoController,
  getOneVideoController,
  getAllVideosController
};
