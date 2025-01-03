import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to the Rabbit-BE-Orders-Challenge API!';
  }

  getHealthStatus(): { status: string } {
    return { status: 'Healthy' };
  }
}
