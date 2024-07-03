import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("appointments")
export class Appointment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: Number

    @Column({ name: 'user_id'})
    user_id!: Number

    @Column({name: 'service_id'})
    service_id!: Number

    @Column({name: 'date'})
    date!: Date

    @Column({name: 'created_at'})
    created_at!: Date

    @Column({name: 'updated_at'})
    updated_at!: Date
}