import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  
  @Get('top-products')
  async getTopProducts(@Query('area') area: string) {
    if (!area) {
      throw new Error('Area is required');
    }
    return this.orderService.getTopProducts(area);
  }

  @Post('create')
  async createOrder(@Body() orderData: any) {
    if (!orderData) {
      throw new Error('Order data is required');
    }
    return this.orderService.createOrder(orderData);
  }
}
