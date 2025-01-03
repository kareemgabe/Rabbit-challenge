import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';

@Module({
  controllers: [OrderController],
  providers: [
    PrismaService,
    OrderService,
    OrderRepository,
    NotificationService,
  ],
})
export class OrderModule {}
