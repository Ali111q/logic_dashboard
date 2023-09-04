const { University } = require('../models/university');

// Get all universities
const getAllUniversitiesController = async (req, res) => {
  try {
    const universities = await University.find({});
    return res.json(universities);
  } catch (err) {
    return res.status(404).json({ msg: err });
  }
};

// Get one university
const getOneUniversityController = async (req, res) => {
  const universityId = req.params.universityId;
  try {
    const university = await University.findById(universityId);
    
    return res.json(university);
  } catch (error) {
    return res.json({ msg: error });
  }
};

// Delete one university
const deleteOneUniversityController = async (req, res) => {
  const universityId = req.params.universityId;
  try {
    await University.findByIdAndDelete(universityId);
    return res.json({ msg: 'University deleted successfully' });
  } catch (error) {
    return res.json({ msg: `Failed to delete university: ${error}` });
  }
};

// Update one university
const updateOneUniversityController = async (req, res) => {
  const { universityId } = req.params;
  try {
    const updatedUniversity = await University.findByIdAndUpdate(universityId, req.body);
    return res.json(updatedUniversity);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update university' });
  }
};

// Create one university
const postOneUniversityController = async (req, res) => {
  const { universityName, universityImgUrl } = req.body;
  try {
    const newUniversity = await University.create({
      universityName,
      universityImgUrl
    });
    return res.json({ msg: 'New university added successfully', university: newUniversity });
  } catch (error) {
    return res.json({ msg: `Error occurred while adding university: ${error}` });
  }
};

module.exports = {
  postOneUniversityController,
  updateOneUniversityController,
  deleteOneUniversityController,
  getOneUniversityController,
  getAllUniversitiesController
};
