import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Services1720681754116 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "services",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy:"increment"
                    },
                    {
                        name: "service_name",
                        type: "varchar",
                        length: "250",
                        isNullable: false
                    },
                    {
                        name: "description",
                        type: "text"
                    }
                ]
            }),
            true
        )
        }
    
        public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('services')
        }
    }