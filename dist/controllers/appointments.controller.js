"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppointmentById = exports.updateAppointmentById = exports.createAppointment = void 0;
const createAppointment = (req, res) => {
    console.log(req.body);
    console.log(req.body.title);
    res.json({
        success: true,
        message: 'CREATE APPOINTMENT'
    });
};
exports.createAppointment = createAppointment;
const updateAppointmentById = (req, res) => {
    console.log(req.params.id);
    res.json({
        success: true,
        message: `APPOINTMENT UPDATED with id ${req.params.id}`
    });
};
exports.updateAppointmentById = updateAppointmentById;
const deleteAppointmentById = (req, res) => {
    console.log(req.params.id);
    res.json({
        success: true,
        message: `APPOINTMENT DELETE with id ${req.params.id}`
    });
};
exports.deleteAppointmentById = deleteAppointmentById;
