const { Branch } = require('../models/branch');
const { Colleage } = require('../models/colleage');

// Get all branches
const getAllBranchsController = async (req, res) => {
  try {
    const branches = await Branch.find({});
    return res.json(branches);
  } catch (err) {
    return res.status(404).json({ msg: err });
  }
};

// Get one branch
const getOneBranchController = async (req, res) => {
  const branchId = req.params.branchId;
  try {
    const branch = await Branch.findById(branchId);
    if (branch) {
      return res.json(branch);
    }
    return res.json({ msg: 'There is no data here' });
  } catch (error) {
    return res.json({ msg: error });
  }
};

// Delete one branch
const deleteOneBranchController = async (req, res) => {
  const branchId = req.params.branchId;

  try {
    if (!mongoose.Types.ObjectId.isValid(branchId)) {
      return res.status(400).json({ error: 'Invalid branch ID' });
    }

    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res.status(404).json({ error: 'Branch not found' });
    }

    const colleageId = branch.colleage;

    await Colleage.findByIdAndUpdate(colleageId, { $pull: { colleageBranches: branchId } });

    await Branch.findByIdAndDelete(branchId);

    return res.json({ message: 'Branch deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while deleting the branch' });
  }
};

// Update one branch
const updateOneBranchController = async (req, res) => {
  const branchId = req.params.branchId;

  try {
    const updatedBranch = await Branch.findByIdAndUpdate(branchId, req.body);
    return res.json(updatedBranch);
  } catch (error) {
    return res.json(error);
  }
};

// Create one branch
const postOneBranchController = async (req, res) => {
  const { branchName, branchStageNumbers, colleageId } = req.body;

  try {
    const colleage = await Colleage.findById(colleageId);
    if (!colleage) {
      return res.status(404).json({ error: 'Colleage not found' });
    }

    const newBranch = await Branch.create({
      branchName,
      branchStageNumbers,
      colleage: colleage._id
    });

    colleage.colleageBranches.push(newBranch._id);
    await colleage.save();

    return res.json({ message: 'New branch added successfully', branch: newBranch });
  } catch (error) {
    return res.json({ msg: `This is an error ${error}` });
  }
};

module.exports = {
  postOneBranchController,
  updateOneBranchController,
  deleteOneBranchController,
  getOneBranchController,
  getAllBranchsController
};
