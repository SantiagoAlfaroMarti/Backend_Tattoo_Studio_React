import bcrypt from 'bcrypt';
import { AppDataSource } from "../database/db";
import { User } from "../database/models/user";

export const usersSeeder = async () => {
    try {
        await AppDataSource.initialize();
        
        const user1 = new User();
        user1.id = 1;
        user1.email = "santi@santi.com";
        user1.password_hash = bcrypt.hashSync("123456789", 12);
        user1.role_id = 3
        await user1.save();

        const user2 = new User();
        user2.id = 2;
        user2.email = "david@david.com";
        user2.password_hash = bcrypt.hashSync("123456789", 12);
        user2.role_id = 2
        await user2.save();

        const user3 = new User();
        user3.id = 3;
        user3.email = "mandy@mandy.com";
        user3.password_hash = bcrypt.hashSync("123456789", 12);
        user3.role_id = 1
        await user3.save();

        console.log("==================================");
        console.log("Users seeder executed successfully");
        console.log("==================================");
        
    } catch (error: any) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("=========================================");
        console.error('Error in users seeder execution:', message);
        console.error("=========================================");

    } finally {
        await AppDataSource.destroy();
    }
}