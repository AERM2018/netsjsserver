import { AuthorEntity } from "src/authors/author.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('books')
export class BookEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @OneToOne( type => AuthorEntity)
    parent: AuthorEntity
    
    @Column({ length: 50})
    title:string;

    @Column()
    numPages:number;

    @Column({ length: 255})
    description:string;
    
    @Column({ length: 10})
    ISBN:string;

    @Column({ length: 255})
    cover:string;

}