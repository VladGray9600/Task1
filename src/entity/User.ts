import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Comment } from "./Comment";
import { Article } from "./Article";
import { Length, IsNotEmpty } from "class-validator";
const bcrypt = require('bcrypt');




@Entity('user')
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: number;
    
    
    @Column()
    @Length(4, 20)
    name: string;

    @Column()
    email: string;

    @Column()
    @Length(4, 100)
    password: string;

    @Column()
    @IsNotEmpty()
    role: string;

    

//         Настройка связей между сущностями 

    @OneToMany(() => Article, article => article.user)
    article : Article[];

    @OneToMany(() => Comment, comment => comment.user)
    comment : Comment[];

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
      }
    
}
