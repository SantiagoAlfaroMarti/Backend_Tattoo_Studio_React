import { AppDataSource } from "../database/db"
import { Appointment } from "../database/models/appointment";

export const appointmentsSeeder = async () => {
    try {
        await AppDataSource.initialize();
        
        const appointment1 = new Appointment();
        appointment1.id = 1;
        appointment1.appointment_date = new Date ("2024-05-03");
        appointment1.user_id = 2;
        appointment1.service_id = 2;
        await appointment1.save();

        const appointment2 = new Appointment();
        appointment2.id = 2;
        appointment2.appointment_date = new Date ("2024-05-15");
        appointment2.user_id = 2;
        appointment2.service_id = 1;
        await appointment2.save();

        const appointment3 = new Appointment();
        appointment3.id = 3;
        appointment3.appointment_date = new Date ("2024-05-23");
        appointment3.user_id = 2;
        appointment3.service_id = 1;
        await appointment3.save();

        console.log("========================================");
        console.log("Appointment seeder successfully executed");
        console.log("========================================");
          
    } catch (error: any) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("=========================================================");
        console.error("Error in the execution of the appointment seeder", message);
        console.error("=========================================================");
    } finally {
        await AppDataSource.destroy();
    }    
}