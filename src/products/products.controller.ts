import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/utility/common/user-role.enum';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { ProductsEntity } from './entities/product.entity';
import { AuthenticationGuard } from './../utility/guards/authentication.guard';
import { AuthorizeGuard } from './../utility/guards/authorization.guard';
import { UserEntity } from 'src/users/entities/user.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
@UseGuards(AuthenticationGuard,AuthorizeGuard([Roles.ADMIN]))
  @Post()
  async create(@Body() createProductDto: CreateProductDto,@CurrentUser() currentUser:UserEntity): Promise<ProductsEntity> {
    return await this.productsService.create(createProductDto, currentUser);
  }

  @Get()
 async findAll():Promise<ProductsEntity[]> {
    return await this.productsService.findAll();
  }

  @Get(':id')
 async  findOne(@Param('id') id: string) {
    return await this.productsService.findOne(+id);
  }
@UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto ,@CurrentUser() CurrentUser:UserEntity):Promise<ProductsEntity>{
    return await this.productsService.update(+id, updateProductDto, CurrentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
