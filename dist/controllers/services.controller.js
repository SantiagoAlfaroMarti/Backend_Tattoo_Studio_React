"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteServiceById = exports.updateServiceById = exports.createService = void 0;
const createService = (req, res) => {
    console.log(req.body);
    console.log(req.body.name);
    res.json({
        success: true,
        message: 'CREATE SERVICE'
    });
};
exports.createService = createService;
const updateServiceById = (req, res) => {
    console.log(req.params.id);
    res.json({
        success: true,
        message: `SERVICE UPDATED with id ${req.params.id}`
    });
};
exports.updateServiceById = updateServiceById;
const deleteServiceById = (req, res) => {
    console.log(req.params.id);
    res.json({
        success: true,
        message: `SERVICE DELETE with id ${req.params.id}`
    });
};
exports.deleteServiceById = deleteServiceById;
