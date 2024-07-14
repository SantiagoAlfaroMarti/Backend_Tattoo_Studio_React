import { appointmentsSeeder } from "./appointmentsSeeder";
import { rolesSeeder } from "./rolesSeeder";
import { servicesSeeder } from "./servicesSeeder";
import { usersSeeder } from "./usersSeeder";

(async () => { 
    await rolesSeeder();
    await usersSeeder();
    await servicesSeeder();
    await appointmentsSeeder();
})();