const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { Course } = require('../models/course');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

// Get One Account
exports.getOneAccount = async (req, res) => {
    try {
        const { currentUserId } = req.params;
        const user = await User.findById(currentUserId);
        return res.json(user);
    } catch (err) {
        return res.json({ msg: `An error occurred: ${err}` });
    }
};

// Get All Accounts
exports.getAllAccounts = async (req, res) => {
    try {
        const users = await User.find({});
        return res.json(users);
    } catch (err) {
        res.json({ msg: `An error occurred: ${err}` });
    }
};

// Activate Course
exports.activeCourse = async (req, res) => {
    try {
        const { courseId, userId } = req.params;
        const [course, user] = await Promise.all([
            Course.findById(courseId),
            User.findById(userId),
        ]);

        if (user.userCourses.includes(course.id)) {
            return res.json('The course is already activated');
        }

        user.userCourses.push(course._id);
        await user.save();
        return res.json({ msg: 'The course is activated successfully' });
    } catch (err) {
        res.json({ msg: `An error occurred: ${err}` });
    }
};

// Deactivate Course
exports.nonActiveCourse = async (req, res) => {
    try {
        const { courseId, userId } = req.params;
        const [course, user] = await Promise.all([
            Course.findById(courseId),
            User.findById(userId),
        ]);

        if (!user.userCourses.includes(course.id)) {
            return res.json('The course is already non-active');
        }

        user.userCourses.pull(course._id);
        await user.save();
        return res.json({ msg: 'The course is non-activated' });
    } catch (err) {
        res.json({ msg: `An error occurred: ${err}` });
    }
};

// Sign up controller
exports.postSignUp = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({
                msg: 'You already have an account. Please log in and try again.',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 11);
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
        });

        newUser.role = email === process.env.ADMIN_EMAIL && username === process.env.ADMIN_USERNAME
            ? 'Admin'
            : 'User';

        await newUser.save();

        const token = jwt.sign(
            {
                email: newUser.email,
                userId: newUser._id,
                role: newUser.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        );

        return res.status(201).json({
            token,
            email: newUser.email,
            username: newUser.username,
            userId: newUser._id,
            msg: `You are now ${newUser.role}`,
        });
    } catch (err) {
        return res.json({ msg: `An error occurred: ${err}` });
    }
};

// Log in controller
exports.postLogIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(req.body);
        if (!user) {
            return res.json({ msg: 'Your email or password is wrong. Please try again.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const token = jwt.sign(
                {
                    email: user.email,
                    userId: user._id,
                    username: user.username,
                    role: user.role,
                },
                process.env.JWT_SECRET,
                { expiresIn: '3d' }
            );
            return res.status(201).json({ token, email: user.email, username:user.username, userId:user._id ,  msg: 'Login successful' });
        } else {
            return res.json('The email or password is not valid. Please try again.');
        }
    } catch (err) {
        return res.json({ msg: `An error occurred: ${err}` });
    }
};



// Update user information
exports.patchUpdateUser = async (req, res) => {
    try {
        const { userSecurityInformation } = req.params;
        const {
            universityName,
            collegeName,
            branchName,
            studyType,
            educationalLevel,
        } = req.body;

        // Find the user by ID and update the fields
        const updatedUser = await User.findByIdAndUpdate(
            userSecurityInformation,
            {
                universityName,
                collegeName,
                branchName,
                studyType,
                educationalLevel,
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




