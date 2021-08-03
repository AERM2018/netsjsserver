import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('authors')
export class AuthorEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ length: 50})
    firstName:string;

    @Column({ length: 50})
    secondName:string;

    @Column({ length: 50})
    surname:string;
    
    @Column()
    birthdate:Date
    
    @Column({length:500})
    bio:string

    @Column({length:255})
    profilePic:string
}

