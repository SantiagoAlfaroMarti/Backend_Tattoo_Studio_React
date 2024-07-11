import { AppDataSource } from "../database/db";
import { Role } from "../database/models/role";

export const rolesSeeder = async () => {
    try {
        await AppDataSource.initialize();
        
        const user = new Role();
        user.id = 1;
        user.name = "user";
        await user.save();

        const admin = new Role();
        admin.id = 2;
        admin.name = "admin";
        await admin.save();

        const superAdmin = new Role();
        superAdmin.id = 3;
        superAdmin.name = "superAdmin";
        await superAdmin.save();

        console.log("===========================");
        console.log("Roles seeder executed successfully");
        console.log("===========================");
        
    } catch (error: any) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("----------------------");
        console.error('Error in roles seeder execution:', message);
        console.error("----------------------");

    } finally {
        await AppDataSource.destroy();
    }
}