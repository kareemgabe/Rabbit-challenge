import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private notificationService: NotificationService, 
  ) {}

  async getTopProducts(area: string) {
    const topProducts = await this.orderRepository.getTopProductsByArea(area);
    return topProducts.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      orderCount: product._count.orders,
    }));
  }

  async createOrder(orderData: any) {
    // Create a new order
    const newOrder = await this.orderRepository.create(orderData);

    // Send notification
    const message = `New Order Created! Order ID: ${newOrder.id}`;
    await this.notificationService.sendNotification('Order Created', message);

    return newOrder;
  }
}
