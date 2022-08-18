import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "text" })
    role: string;

    @Column({ unique: true, type: "varchar", length: "130" })
    Username: string;

    @Column({ type: "varchar", length: "130" })
    Email: string;

    @Column({ type: "text", length: "255" })
    Password: string;

    @Column( "int", { default: 0 })
    tokenVersion: number;

    @CreateDateColumn({ type: "date" })
    CreatedAt: Date;

    @CreateDateColumn({ type: "date" })
    UpdatedAt: Date;
}
