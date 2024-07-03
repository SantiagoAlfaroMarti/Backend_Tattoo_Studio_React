import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("roles")
export class Role extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: Number

    @Column({ name: 'name'})
    name!: string
}