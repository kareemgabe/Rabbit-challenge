import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: any): Promise<Product[]> {
    const { categories, skip, take, orderBy } = filters;

    console.log('Filters received:', filters); // Log filters received
    console.log('Categories:', categories);
    console.log('Skip:', skip);
    console.log('Take:', take);
    console.log('OrderBy:', orderBy);

    const products = await this.prisma.product.findMany({
      where: categories ? { category: { in: categories } } : undefined,
      skip,
      take,
      orderBy,
    });

    console.log('Products found:', products); // Log the fetched products

    return products;
  }

  async findById(id: number): Promise<Product | null> {
    console.log('Finding product by ID:', id); // Log the ID being searched

    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    console.log('Product found:', product); // Log the fetched product or null

    return product;
  }
}
