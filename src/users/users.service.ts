import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSignUpDto } from './dto/user-signup.dto';
import * as bcrypt from 'bcrypt';
import { UserSignInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository:Repository<UserEntity>){}
//register
    async signup(userSignUpDto:UserSignUpDto):Promise<UserEntity>{
      const userExists=await this.findUserByEmail(userSignUpDto.email)
      if(userExists) throw new BadRequestException('email is not avalible.')
       userSignUpDto.password = await bcrypt.hash(userSignUpDto.password, 10);
      const user=this.usersRepository.create(userSignUpDto)
      return await this.usersRepository.save(user)

    }

    //login

    async signin(userSignInDto:UserSignInDto):Promise<UserEntity>{
      const userExists=await this.usersRepository.createQueryBuilder('users').addSelect('users.password')
      .where('users.email=:email',{email:userSignInDto.email})
      .getOne()
      if(!userExists) throw new BadRequestException('Bad creadenrials.')
        const matchPassword=await bcrypt.compare(userSignInDto.password,userExists.password)
      if(!matchPassword) throw new BadRequestException('Bad credentials')

        //imp //delete userExists.password
      //.findUserByEmail(userSignInDto.email)
     // if(userExists) throw new BadRequestException('email is not avalible.')
   return userExists;
    }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

 async findOne(id: number): Promise<UserEntity>{
const user= await this.usersRepository.findOneBy({id})
if(!user) throw new NotFoundException('user not found')
  return user
 }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }




  // custom methods
  async findUserByEmail(email:string){
    return await this.usersRepository.findOneBy({email})
  }

  async accessToken(user:UserEntity):Promise<string>{
return sign(
  {
    id: user.id,
    email: user.email,
  },
  process.env.ACCESS_TOKEN_SECRET_KEY || 'sumi@123',
  {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME || '1h',
  } as any
);
  }
}
