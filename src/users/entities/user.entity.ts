import { CategoryEntity } from "src/category/entities/category.entity";
import { ProductsEntity } from "src/products/entities/product.entity";
import { ReviewEntity } from "src/reviews/entities/review.entity";
import { Roles } from "src/utility/common/user-role.enum";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {
@PrimaryGeneratedColumn()
id:number;
@Column()
name:string;
@Column({unique:true})
email:string;
@Column({select:false})
password:string;
@Column({type:'enum',enum:Roles,array:true,default:[Roles.USER]})
roles:Roles[]
@CreateDateColumn()
createdAt:Date;
@UpdateDateColumn()
updatedAt:Date;



@OneToMany(()=>CategoryEntity,(cat)=>cat.addedBy)
categories:CategoryEntity[];


@OneToMany(()=>ProductsEntity,(prod)=>prod.addedBy)
products:ProductsEntity[]

@OneToMany(()=>ReviewEntity,(rev)=>rev.user)
reviews:ReviewEntity[]


@ManyToOne(type=>ProductsEntity,(prod)=>prod.reviews)
product:ProductsEntity


}
