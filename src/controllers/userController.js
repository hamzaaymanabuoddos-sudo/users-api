
const {
    getAllUsers: getAllUsersFromModel,
    getUserById: getUserByIdFromModel,
    createUser: createUserFromModel,
    updateUser: updateUserFromModel,
    deleteUser: deleteUserFromModel,
} = require('../models/userModel');

// دالة مساعدة: تتأكد أن id رقم صحيح موجب
function isValidId(value) {
    const id = Number(value);
    return Number.isInteger(id) && id > 0;
}

// GET /users
const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersFromModel();

        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
};

// GET /users/:id
const getUserById = async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({
                error: 'Invalid user id',
            });
        }

        const user = await getUserByIdFromModel(req.params.id);

        if (!user) {
            return res.status(404).json({
                error: 'User not found',
            });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Database error',
        });
    }
};

// POST /users
const createUser = async (req, res) => {
    try {
        const { name, email, age } = req.body || {};

        if (!name || !email) {
            return res.status(400).json({
                error: 'name and email are required',
            });
        }

        if (
            age !== undefined &&
            age !== null &&
            !Number.isInteger(age)
        ) {
            return res.status(400).json({
                error: 'age must be an integer',
            });
        }

        const user = await createUserFromModel(
            name,
            email,
            age
        );

        res.status(201).json(user);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({
                error: 'Email already exists',
            });
        }

        console.error(error);
        res.status(500).json({
            error: 'Database error',
        });
    }
};

// PUT /users/:id
const updateUser = async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({
                error: 'Invalid user id',
            });
        }

        const { name, email, age } = req.body || {};

        if (!name || !email) {
            return res.status(400).json({
                error: 'name and email are required',
            });
        }

        if (
            age !== undefined &&
            age !== null &&
            !Number.isInteger(age)
        ) {
            return res.status(400).json({
                error: 'age must be an integer',
            });
        }

        const user = await updateUserFromModel(
            req.params.id,
            name,
            email,
            age
        );

        if (!user) {
            return res.status(404).json({
                error: 'User not found',
            });
        }

        res.json(user);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({
                error: 'Email already exists',
            });
        }

        console.error(error);
        res.status(500).json({
            error: 'Database error',
        });
    }
};

// DELETE /users/:id
const deleteUser = async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({
                error: 'Invalid user id',
            });
        }

        const user = await deleteUserFromModel(req.params.id);

        if (!user) {
            return res.status(404).json({
                error: 'User not found',
            });
        }

        res.json({
            message: 'User deleted successfully',
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Database error',
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
