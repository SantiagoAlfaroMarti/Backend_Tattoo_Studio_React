import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Appointments1720681772677 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "appointments",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy:"increment"
                    },
                    {
                        name: "appointment_date",
                        type: "date",
                        isNullable: false
                    },
                    {
                        name: "user_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "service_id",
                        type: "int",
                        isNullable: false

                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ['user_id'],
                        referencedTableName: 'users',
                        referencedColumnNames: ["id"]
                    },
                    {
                        columnNames: ['service_id'],
                        referencedTableName: 'services',
                        referencedColumnNames: ["id"]
                    }
                ]
            }),
            true
        )
        }
    
        public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('roles')
        }
    }