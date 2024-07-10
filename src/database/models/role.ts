import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user"

@Entity("roles")
export class Role extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'name'})
    name!: string

    @OneToMany(() => User, (user) => user.role)
    users!: User[]
}