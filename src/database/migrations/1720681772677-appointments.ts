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
                        name: "userId",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "serviceId",
                        type: "int",
                        isNullable: false

                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ['userId'],
                        referencedTableName: 'users',
                        referencedColumnNames: ["id"]
                    },
                    {
                        columnNames: ['serviceId'],
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
