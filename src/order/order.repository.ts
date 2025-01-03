import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderRepository {
  constructor(private prisma: PrismaService) {}

  async getTopProductsByArea(area: string) {
    return this.prisma.product.findMany({
      where: {
        area,
      },
      orderBy: {
        orders: {
          _count: 'desc',
        },
      },
      take: 10,
      include: {
        _count: {
          select: { orders: true },
        },
      },
    });
  }
  async create(orderData: any) {
    return this.prisma.order.create({
      data: {
        customerId: orderData.customerId, 
        createdAt: new Date(), 
      },
    });
  }
}
