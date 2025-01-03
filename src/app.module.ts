import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { NotificationModule } from './notification/notification.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ProductModule, OrderModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
