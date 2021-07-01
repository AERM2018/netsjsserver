import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private service:UsersService){}

@Get()
getUsers(){
    return this.service.getAllUsers()
}

@Get(":id")
getUserById(@Param() params){
    return this.service.getUser(params.id)
}

@Post()
addUser(@Body() user:UserEntity){
    return this.service.createUser( user );
    
}

@Put()
updateUser(@Body() user:UserEntity){
    return this.service.updateUser(user)
    
}

@Patch()
updateAttUser(){
    return "updateAttUser"
    
}

@Delete()
deleteUser(@Body() user:UserEntity){
    return this.service.deleteUser(user)

}
}
