const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    videoTitle: {
      type: String,
      required: true
    },
    videoDescription: { // Corrected typo
      type: String,
      required: true
    },
    videoImgUrl: {
      type: String,
      required: true
    },
    videoUrl: {
      type: String,
      required: true
    },
    videoSequence: {
      type: Number,
      required: true
    },
    videoChapter: {
      type: String,
      required: true
    },
    videoDuration: {
      type: Number,
      required: true
    },
    isVideoFree: {
      type: Boolean
    },
    videoCourse: {
      type: mongoose.Types.ObjectId,
      ref: "Course"
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  exports.Video = mongoose.model('Video', videoSchema);
  