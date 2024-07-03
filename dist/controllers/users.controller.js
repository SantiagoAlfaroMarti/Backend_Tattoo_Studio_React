"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.createUser = void 0;
const createUser = (req, res) => {
    console.log(req.body);
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.password);
    res.json({
        success: true,
        message: 'CREATE USER'
    });
};
exports.createUser = createUser;
const updateUserById = (req, res) => {
    console.log(req.params.id);
    res.json({
        success: true,
        message: `USER UPDATED with id ${req.params.id}`
    });
};
exports.updateUserById = updateUserById;
const deleteUserById = (req, res) => {
    res.json({
        success: true,
        message: `USER DELETED With id: ${req.params.id}`
    });
};
exports.deleteUserById = deleteUserById;
