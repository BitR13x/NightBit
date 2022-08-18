import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "int" })
    UserID: number;

    @Column({ type: "text" })
    PostID: string;

    @Column({ type: "varchar", length: "999" })
    Body: string;

    @Column({ type: "text" })
    User: string;

    @CreateDateColumn({ type: "date" })
    CreatedAt: Date;

    @CreateDateColumn({ type: "date" })
    UpdatedAt: Date;
}
