import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UserSignInDto } from "./user-signin.dto";

export class UserSignUpDto extends UserSignInDto{

    @IsNotEmpty({message:'name can not be null'})
    @IsString({message:'name should be string'})
    name:string;

    
}