import { Request, Response } from "express";

export const createAppointment =  (req: Request, res: Response) => {
    console.log(req.body);
    console.log(req.body.title);
    
    res.json({
        success: true,
        message: 'CREATE APPOINTMENT'
       })
}

export const updateAppointmentById = (req: Request, res: Response) => {
    console.log(req.params.id);

    res.json({
        success: true,
        message: `APPOINTMENT UPDATED with id ${req.params.id}`
       })
}
