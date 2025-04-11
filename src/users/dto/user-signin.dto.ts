import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UserSignInDto{
    
    @IsNotEmpty({message:"email can not be empty."})
    @IsEmail({},{message:'email is not a valid email'})
    email:string;

    @IsNotEmpty({message:"password can not be empty"})
    @MinLength(5,{message:'password minimum character should be 5.'})
    password:string;
}