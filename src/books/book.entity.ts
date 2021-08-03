import { AuthorEntity } from "src/authors/author.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('books')
export class BookEntity{
    constructor( options:{}){

    }
    @PrimaryGeneratedColumn()
    id:number;

    
    @ManyToOne( type => AuthorEntity, author => author.id, {eager : true})
    @JoinColumn({name:'author_id',referencedColumnName : 'id'})
    author : AuthorEntity
    
    @Column({ length: 50})
    title:string; 

    @Column()
    numPages:number; 

    @Column({ length: 500})
    description:string;
    
    @Column({ length: 10})
    ISBN:string;

    @Column({ length: 255})
    cover:string; 
 
}