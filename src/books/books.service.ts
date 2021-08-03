import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from 'src/authors/author.entity';
import { Repository } from 'typeorm';
import { BookEntity } from './book.entity';

@Injectable()
export class BooksService {
    constructor(@InjectRepository(BookEntity) private rep:Repository<BookEntity>){}
    
    async getAllBooks():Promise<BookEntity[]>{
        return this.rep.find(); 
    }

    async getBookById( id : number):Promise<BookEntity[]>{
        return this.rep.findByIds([id]);
    }

    async createNewBook( book:BookEntity ){
        try {
            return this.rep.insert(book)
            
        } catch (error) {
            console.log(error);
        }
    } 

    async updateBook(id:number,book:BookEntity){
        return this.rep.update({id},book)
    }

    async deleteBook(id:number){
        return this.rep.delete(id)
    }
    
}
