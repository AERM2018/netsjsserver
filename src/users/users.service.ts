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

    async getUser(_id:number):Promise<UserEntity[]>{
        return this.rep.findByIds([_id]);
    }

    async createUser(user:UserEntity){
        await this.rep.insert( user )
    }

    async updateUser(user:UserEntity){
        await this.rep.update({ id: user.id },user);
    }

    async deleteUser(user:UserEntity){
        await this.rep.delete(user);
    }
}
