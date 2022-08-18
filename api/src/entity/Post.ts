import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from "typeorm";

@Entity()
export class Post extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true, type: "varchar", length: "130" })
    Title: string;

    @Column({ type: "varchar", length: "130" })
    Content: string;

    @Column({ type: "int" })
    AuthorID: number;

    @Column( "int", { default: 0 })
    Author: string;

    @CreateDateColumn({ type: "date" })
    CreatedAt: Date;

    @CreateDateColumn({ type: "date" })
    UpdatedAt: Date;
}
