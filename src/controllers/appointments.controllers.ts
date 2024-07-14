import e, { Request, Response } from "express";
import { Appointment } from "../database/models/appointment";

export const createAppointment = async (req: Request, res: Response) => {
    try {
        // 1. Conseguir la informacion //
        const appDate = req.body.appointment_date;
        const userID = req.tokenData.id;
        const serviceID = req.body.service_id;

        // 2. Comprobar la información //
        if (!appDate || !serviceID) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Date and Service not be empty"
                }
            )
        }

        // 3. Guardar la información //
        const newAppointment = await Appointment.create(
            {
                appointment_date: appDate,
                user_id: userID,
                service_id: serviceID
            }
        ).save();

        // 4. Respuesta //
        res.status(201).json(
            {
                success: true,
                message: "Appointment created correctly",
                data: newAppointment
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error new appointment",
                error: error
            }
        )

    }
}

export const updateAppointment = async (req: Request, res: Response) => {
    try {
        // 1. Id de la cita que se quiere actualizar //
        const appointmentID = req.body.id;
        const body = req.body;

        // 2. Comprobar Id //
        const appointment = await Appointment.findOne(
            {
                where: {
                    id: parseInt(appointmentID)
                }
            }
        )

        if (!appointment) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Appointment undefine"
                }
            )
        }

        // 3. Actualizar y guardar la información //

        const updateApp = await Appointment.update(
            {
                id: parseInt(appointmentID)
            },
            body
        )

        // 4. Respuesta //
        res.status(200).json(
            {
                success: true,
                message: "Modified appointment",
                data: updateApp
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error changing appointment details",
                error: error
            }
        )

    }
}

export const findAppointmendById = async (req: Request, res: Response) => {
    try {
        // 1. Buscar Id de la cita //
        const appId = req.body.id;
        const userID = req.tokenData.id;

        // 2. Buscar Id en la DB //
        const appointment = await Appointment.findOne(
            {
                where: {
                    user: { id: userID },
                    id: parseInt(appId)
                },
                relations: { service: {} }
            }
        )

        if (!appId) {
            return res.status(404).json(
                {
                    success: false,
                    message: "No appointment found"
                }
            )
        }

        // 3. Respuesta //
        res.json(
            {
                success: true,
                message: "Recovered appointment",
                data: appointment
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "No finding appointment",
                error: error
            }
        )

    }
}

export const showMyAppointments = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.id;

        const appointment = await Appointment.find(
            {
                select: {
                    id: true,
                    appointment_date: true,
                    user: {
                        id: true,
                        email: true
                    },
                    service: {
                        id: true,
                        service_name: true
                    },
                },
                where:
                {
                    user_id: userId
                },

                relations: { user: {}, service: {} }
            }
        );

        res.status(200).json(
            {
                success: true,
                message: "User appointments found",
                data: appointment
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                susscess: false,
                message: "@@@",
                error: error
            }
        )
    }
}

export const deleteAppointment = async (req: Request, res: Response) => {
    try {
        const appID = req.body.id

        const appointment = await Appointment.findOneBy({
            id: parseInt(appID)
        })

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            })
        }

        const deletedApp = await Appointment.delete({
            id: parseInt(appID)
        }
        )

        return res.status(200).json({
            success: true,
            message: "Appointment deleted",
            data: deletedApp
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Appointment can't be deleted",
            error: error
        })
    }
}