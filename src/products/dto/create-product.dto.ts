import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({message:'title is not empty'})
    @IsString({message:'title must be string'})
title:string;


@IsNotEmpty({message:'description is not empty'})
@IsString()
description:string;

@IsNotEmpty({message:'price is not empty'})
@IsNumber({maxDecimalPlaces:2},{message:'price should be number & max decimal precission 2'})
@IsPositive({message:'price should be positive number'})
price:number;

@IsNotEmpty({message:'stock is not empty'})
@IsNumber({},{message:'stock should be a number'})
@Min((0),{message:'stock can not be negative'})
stock:number;

@IsNotEmpty({message:'images is not empty'})
@IsArray({message:'images should be in array formate'})
images:string[];

@IsNotEmpty({message:'category is not empty'})
@IsNumber({},{message:'category should be number'})
categoryId:number


}
