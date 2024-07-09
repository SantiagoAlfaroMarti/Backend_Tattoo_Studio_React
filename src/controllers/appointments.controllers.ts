import e, { Request, Response } from "express";
import { Appointment } from "../database/models/Appointment";

export const createAppointment = async (req: Request, res: Response) => {
    try {
        //1. Get the needed information
        const appDate = req.body.appointment_date;
        const userID = req.tokenData.id;
        const serviceID = req.body.service_id;

        //2. Check the obtained information
        if (!appDate || !serviceID) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Date and Service cannot be empty!"
                }
            )
        }

        //3. Save info in our DataBase
        const newAppointment = await Appointment.create(
            {
                appointment_date: appDate,
                user_id: userID,
                service_id: serviceID
            }
        ).save();

        //4. Give a response to the page
        res.status(201).json(
            {
                success: true,
                message: "Appointment created successfully!",
                data: newAppointment
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error creating new appointment!",
                error: error
            }
        )

    }
}

export const updateAppointment = async (req: Request, res: Response) => {
    try {
        //1. Get the ID of the appointment we want to update
        const appointmentID = req.body.id;
        const body = req.body;

        //2. Verify the appID
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
                    message: "Appointment does not exist!"
                }
            )
        }

        //3. If finded app exist = update and save the info

        const updateApp = await Appointment.update(
            {
                id: parseInt(appointmentID)
            },
            body
        )

        //4. Response provide
        res.status(200).json(
            {
                success: true,
                message: "Appointment amended successfully!",
                data: updateApp
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error changing appointment info!",
                error: error
            }
        )

    }
}

export const findAppointmendById = async (req: Request, res: Response) => {
    try {
        //1. Find the ID of the appointment
        const appId = req.body.id;
        const userID = req.tokenData.id;

        //2. Search app by ID in our database
        const appointment = await Appointment.findOne(
            {
                where: {
                    user: { id: userID },
                    id: parseInt(appId)
                },
                relations: {service: {}}
            }
        )

        if (!appId) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Appointment not found!"
                }
            )
        }

        //3. Provide response 
        res.json(
            {
                success: true,
                message: "Appointment retrived successfully!",
                data: appointment
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error finding appointment",
                error: error
            }
        )

    }
}

export const showMyAppointments = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.id;

        // console.log(userId)
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
                message: "User appointments retrived successfully!",
                data: appointment
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                susscess: false,
                message: "aaaaa",
                error: error
            }
        )
    }
}

export const deleteAppointment = async (req: Request, res: Response) => {
    try {
        //1. Get ID of the aPp we will delete
        const appID = req.params.id;

        //.2 Verify if the ID exists
        const appointmentIs = await Appointment.findOneBy({
            id: parseInt(appID)
        })

        if (!appointmentIs) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Appointment not found!"
                }
            )
        }

        //3. IF found > delete it
        const deletedApp = await Appointment.delete(
            {
                id: parseInt(appID)
            }
        )

        //4. Confirmation
        res.status(200).json(
            {
                success: true,
                message: "Appointment deleted successfully!",
                data: deletedApp
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error deleting appointment!",
                error: error
            }
        )

    }
}