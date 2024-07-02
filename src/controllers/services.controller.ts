import { Request, Response } from "express";

export const createService = (req: Request, res: Response) => {
    console.log(req.body);
    console.log(req.body.name)
    

    res.json({
        success: true,
        message: 'CREATE SERVICE'
    })
}


export const updateServiceById = (req: Request, res: Response) => {
    console.log(req.params.id);

    res.json({
        success: true,
        message: `SERVICE UPDATED with id ${req.params.id}`
    })
}

export const deleteServiceById = (req: Request, res: Response) => {
    console.log(req.params.id);

    res.json({
        success: true,
        message: `SERVICE DELETE with id ${req.params.id}`
    })
}