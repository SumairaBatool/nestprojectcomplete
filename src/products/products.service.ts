import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoryService } from 'src/category/category.service';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(ProductsEntity)
  private readonly productRepository: Repository<ProductsEntity>,
    private readonly categoryService: CategoryService
  ) { }



  async create(createProductDto: CreateProductDto, currentUser: UserEntity): Promise<ProductsEntity> {
    const category = await this.categoryService.findOne(+createProductDto.categoryId);
    if (!category) {
      throw new Error('Category not found');
    }
    const product = this.productRepository.create(createProductDto);
    //this is same of above//const p=Object.assign(ProductEntity, CreateProductDto)
    product.category = category;
    product.addedBy = currentUser;

    return await this.productRepository.save(product)

  }

  async findAll(): Promise<ProductsEntity[]> {
    return await this.productRepository.find()
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: {
        addedBy: true,
        category: true
      },
      select: {
        addedBy: {
          id: true,
          name: true,
          email: true,
        },
        category: {
          id: true,
          title: true
        }
      }
  
    })
    if(!product) throw new NotFoundException('product not found error')
      return product;
  }

  async update(id: number, updateProductDto: Partial<UpdateProductDto>, currentUser:UserEntity):Promise<ProductsEntity>{
    const product= await  this.findOne(id)
    Object.assign(this.productRepository,updateProductDto)
    product.addedBy=currentUser;
    
    if(updateProductDto.categoryId){
      const category = await this.categoryService.findOne(
        +updateProductDto.categoryId
      );
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      product.category = category;
    }
    return await this.productRepository.save(product)
   
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
