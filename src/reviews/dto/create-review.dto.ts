import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReviewDto {
@IsNotEmpty({message:'product id should not be empty'})
@IsNumber({},{message:'product id should be a number'})
    productId:number;


    @IsNotEmpty({message:'ratings should not be empty'})
    @IsNumber({},{message:'ratings id should be a number'})
    ratings:number;

    
    @IsNotEmpty({message:'comments should not be empty'})
    @IsString()
    comments:string
}
