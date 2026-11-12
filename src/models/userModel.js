const pool = require('../config/db');

// GET ALL USERS
const getAllUsers = async () => {
    const result = await pool.query(
        'SELECT * FROM users ORDER BY id'
    );

    return result.rows;
};

// GET USER BY ID
const getUserById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
    );

    return result.rows[0];
};

// CREATE USER
const createUser = async (name, email, age) => {
    const result = await pool.query(
        `INSERT INTO users (name, email, age)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [name, email, age ?? null]
    );

    return result.rows[0];
};

// UPDATE USER
const updateUser = async (id, name, email, age) => {
    const result = await pool.query(
        `UPDATE users
         SET name = $1,
             email = $2,
             age = $3
         WHERE id = $4
         RETURNING *`,
        [name, email, age ?? null, id]
    );

    return result.rows[0];
};

// DELETE USER
const deleteUser = async (id) => {
    const result = await pool.query(
        'DELETE FROM users WHERE id = $1 RETURNING *',
        [id]
    );

    return result.rows[0];
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};