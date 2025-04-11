import { ProductsEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from "typeorm";

@Entity('reviews')
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ratings: number;

  @Column()
  comments: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @ManyToOne(() => UserEntity, (user) => user.reviews)
  user: UserEntity;

  @ManyToOne(() => ProductsEntity, (product) => product.reviews)
  product: ProductsEntity;
}
