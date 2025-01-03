import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { NotificationService } from '../notification/notification.service';

describe('OrderService', () => {
  let service: OrderService;
  let orderRepositoryMock: OrderRepository;
  let notificationServiceMock: NotificationService;

  beforeEach(async () => {
    orderRepositoryMock = {
      getTopProductsByArea: jest.fn(),
    } as unknown as OrderRepository;

    notificationServiceMock = {
    
    } as unknown as NotificationService;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: OrderRepository,
          useValue: orderRepositoryMock,
        },
        {
          provide: NotificationService,
          useValue: notificationServiceMock,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return top products for a given area', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', category: 'Category 1', _count: { orders: 10 } },
      { id: 2, name: 'Product 2', category: 'Category 2', _count: { orders: 5 } },
    ];
    orderRepositoryMock.getTopProductsByArea = jest.fn().mockResolvedValue(mockProducts);

    const result = await service.getTopProducts('some-area');
    expect(result).toEqual([
      { id: 1, name: 'Product 1', category: 'Category 1', orderCount: 10 },
      { id: 2, name: 'Product 2', category: 'Category 2', orderCount: 5 },
    ]);
    expect(orderRepositoryMock.getTopProductsByArea).toHaveBeenCalledWith('some-area');
  });
});