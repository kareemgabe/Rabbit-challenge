import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetAllProductsDTO } from './dto/get-all-products.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  async getAllProducts(@Query() filters: GetAllProductsDTO) {
    return this.productsService.getAllProducts(filters);
  }

 @Get(':id')
async getProductById(@Param('id') id: string) {
  const numericId = Number(id);
  
  if (isNaN(numericId)) {
    throw new Error('Invalid ID format. ID must be a numeric value.');
  }

  return this.productsService.getProductById(numericId);
}
}

