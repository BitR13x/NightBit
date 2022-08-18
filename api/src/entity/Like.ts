import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "int" })
    UserID: number;

    @Column({ type: "int" })
    PostID: number;

}
