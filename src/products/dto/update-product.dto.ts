import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
                                    //optional
export class UpdateProductDto extends PartialType(CreateProductDto) {}
