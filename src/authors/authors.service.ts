import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorEntity } from './author.entity';

@Injectable()
export class AuthorsService {
    constructor(@InjectRepository(AuthorEntity) private rep:Repository<AuthorEntity>){}

    async getAuthors():Promise<AuthorEntity[]>{
        return this.rep.find()
    }

    async getAuthorById( id:number ):Promise<AuthorEntity[]>{
        return this.rep.findByIds([id])
    }
    async createNewAuthor( author:AuthorEntity ){
        return this.rep.insert( author );
    }

    async updateAuthor( id:number, author:AuthorEntity ){
        return this.rep.update({id},author)
    }

    async deleteAuthor( id : number ){
        return this.rep.delete({id})
    }
}
