import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ length: 50})
    name:string;

    @Column({ length: 50})
    lastname:string;

    @Column({ length: 200})
    avatar:string;
    
    
}

