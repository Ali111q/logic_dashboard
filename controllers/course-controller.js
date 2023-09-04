const { Branch } = require('../models/branch');
const { Course } = require('../models/course');

// Get all courses
const getAllCoursesController = async (req, res) => {
  try {
    const courses = await Course.find({});
    return res.json(courses);
  } catch (err) {
    return res.status(404).json({ msg: err });
  }
};

// Get one course
const getOneCourseController = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const course = await Course.findById(courseId);
    if (course) {
      return res.json(course);
    }
    return res.json({ msg: 'There is no data here' });
  } catch (error) {
    return res.json({ msg: error });
  }
};

// Delete one course
const deleteOneCourseController = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.json({ msg: 'There is no course with this ID' });
    }

    const branchId = course.branch;

    await Branch.findByIdAndUpdate(branchId, { $pull: { courses: courseId } });

    await Course.findByIdAndDelete(courseId);

    return res.json({ msg: 'Course deleted successfully' });
  } catch (error) {
    return res.json({ error });
  }
};

// Update one course
const updateOneCourseController = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body);
    return res.json({ updatedCourse });
  } catch (error) {
    return res.json(error);
  }
};

// Create one course
const postOneCourseController = async (req, res) => {
  const {
    courseTitle,
    courseImg,
    coursePrice,
    isCourseFree,
    courseDescription,
    courseTeacher,
    courseUniversityName,
    courseColleageName,
    courseStage,
    courseBranchName,
    courseChapter,
    branch
  } = req.body;

  try {
    const oneBranch = await Branch.findById(branch);
    if (!oneBranch) {
      return res.status(404).json({ error: 'Branch not found' });
    }

    const newCourse = await Course.create({
      courseTitle,
      courseImg,
      coursePrice,
      isCourseFree,
      courseDescription,
      courseTeacher,
      courseUniversityName,
      courseColleageName,
      courseStage,
      courseBranchName,
      courseChapter,
      branch: oneBranch._id
    });

    oneBranch.courses.push(newCourse._id);
    await oneBranch.save();
    return res.json({ message: 'New course added successfully', course: newCourse });
  } catch (error) {
    return res.json({ msg: `Error occurred while adding course: ${error}` });
  }
};

module.exports = {
  postOneCourseController,
  updateOneCourseController,
  deleteOneCourseController,
  getOneCourseController,
  getAllCoursesController
};
