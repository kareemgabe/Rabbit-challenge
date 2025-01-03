import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productsRepository: ProductRepository) {}

  async getAllProducts(filters: any): Promise<ProductDTO[]> {
    const { categories, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = filters;

    const skip = (page - 1) * limit;

    return this.productsRepository.findAll({
      categories,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    });
  }
  async getProductById(id: number): Promise<ProductDTO | null> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  }
}
