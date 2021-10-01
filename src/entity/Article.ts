import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { User } from "./User";


@Entity('article')
export class Article {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    author: string;

    @ManyToOne(() => User, user => user.article)
    user: User;
}