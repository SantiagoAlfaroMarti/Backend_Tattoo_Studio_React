import { AppDataSource } from "../db";
import { Service } from "../models/Service";

export const servicesSeeder = async () => {
    try {
        await AppDataSource.initialize();

        const service1 = new Service();
        service1.id = 1;
        service1.service_name = "Tattoo";
        service1.description = "A tattoo is a form of body modification made by inserting tattoo ink, dyes, and/or pigments, either indelible or temporary, into the dermis layer of the skin to form a design.";
        await service1.save();

        const service2 = new Service();
        service2.id = 2;
        service2.service_name = "Piercing";
        service2.description = "Piercing is a form of body modification, is the practice of puncturing or cutting a part of the human body, creating an opening in which jewellery may be worn, or where an implant could be inserted.";
        await service2.save();

        const service3 = new Service();
        service3.id = 3;
        service3.service_name = "Tattoo removal";
        service3.description = "Tattoo removal is the process of removing an unwanted tattoo. The process of tattooing generally creates permanent markings in the skin, but people have attempted many methods to try to hide or destroy tattoos.";
        await service3.save();

        const service4 = new Service();
        service4.id = 4;
        service4.service_name = "Piercing removal";
        service4.description = "This procedure is fast and simple. First, the visible component of the jewellery will be unscrewed, before a short massaging of the jewellery's base/anchor in order to dislodge it. Forceps are then used to remove this from the tissue. The wound will then be closed with sutures or adhesive, depending on the size.";
        await service4.save();

        console.log("===========================");
        console.log("Services seeder executed successfully");
        console.log("===========================");
        
    } catch (error: any) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("----------------------");
        console.error('Error in services seeder execution:', message);
        console.error("----------------------");

    } finally {
        await AppDataSource.destroy();
    }
}