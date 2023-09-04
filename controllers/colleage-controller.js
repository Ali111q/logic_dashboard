const { Colleage } = require('../models/colleage');
const { University } = require('../models/university');

// Get all colleges
const getAllColleagesController = async (req, res) => {
  try {
    const colleges = await Colleage.find({});
    return res.json(colleges);
  } catch (err) {
    return res.status(404).json({ msg: err });
  }
};

// Get one college
const getOneColleageController = async (req, res) => {
  const colleageId = req.params.colleageId;
  try {
    const college = await Colleage.findById(colleageId);
    if (college) {
      return res.json(college);
    }
    return res.json({ msg: 'There is no data here' });
  } catch (error) {
    return res.json({ msg: error });
  }
};

// Delete one college
const deleteOneColleageController = async (req, res) => {
  const collegeId = req.params.colleageId;

  try {
    const college = await Colleage.findById(collegeId);
    if (!college) {
      return res.json({ msg: 'There is no college with this ID' });
    }
    const universityId = college.university;
    await University.findByIdAndUpdate(universityId, { $pull: { universityColleages: collegeId } });

    await Colleage.findByIdAndDelete(collegeId);

    return res.json({ msg: 'College deleted successfully' });
  } catch (error) {
    return res.json({ error });
  }
};

// Update one college
const updateOneColleageController = async (req, res) => {
  const colleageId = req.params.colleageId;

  try {
    const updatedCollege = await Colleage.findByIdAndUpdate(colleageId, req.body);
    return res.json(updatedCollege);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update college' });
  }
};

// Create one college
const postOneColleageController = async (req, res) => {
  const { collegeName, collegeImgUrl, universityId } = req.body;
  console.log(req.body);
  try {
    const university = await University.findById(universityId);
    if (!university) {
      return res.status(404).json({ error: 'University not found' });
    }

    const newCollege = await Colleage.create({
      collegeName:collegeName,
      collegeImgUrl:collegeImgUrl,
      universityId: universityId
    });

    university.universityColleages.push(newCollege._id);
    await university.save();

    return res.json({ message: 'New college added successfully', college: newCollege });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = {
  postOneColleageController,
  updateOneColleageController,
  deleteOneColleageController,
  getOneColleageController,
  getAllColleagesController
};
