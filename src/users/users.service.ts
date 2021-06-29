import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserEntity) private rep:Repository<UserEntity>){}


    async getAllUsers():Promise<UserEntity[]>{
        return await this.rep.find();
    }

    async createUser(user:UserEntity){
        await this.rep.insert( user )
    }
}
