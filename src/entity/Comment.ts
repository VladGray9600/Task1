import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { User } from "./User";


@Entity('comment')
export class Comment {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    content: string;

    @Column()
    user_id: number;

    @Column()
    article_id: number;


    @ManyToOne(() => User, (user) => user.comment)
    user : User;

}