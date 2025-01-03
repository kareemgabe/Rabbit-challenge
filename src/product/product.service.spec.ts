import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { ProductDTO } from './dto/product.dto';
import { GetAllProductsDTO } from './dto/get-all-products.dto';

describe('ProductService', () => {
  let service: ProductService;
  let productRepositoryMock: ProductRepository;

  beforeEach(async () => {
    productRepositoryMock = {
      findAll: jest.fn(),
    } as unknown as ProductRepository;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: productRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all products with filters', async () => {
    const mockProducts: ProductDTO[] = [
      { id: 1, name: 'Product 1', category: 'Category 1', area: 'Area 1', createdAt: new Date() },
      { id: 2, name: 'Product 2', category: 'Category 2', area: 'Area 2', createdAt: new Date() },
    ];
    productRepositoryMock.findAll = jest.fn().mockResolvedValue(mockProducts);

    const filters: GetAllProductsDTO = { categories: ['Category 1'], page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'desc' };
    const expectedFilters = {
      categories: ['Category 1'],
      skip: 0,
      take: 10,
      orderBy: { createdAt: 'desc' },
    };

    const result = await service.getAllProducts(filters);

    expect(result).toEqual(mockProducts);
    expect(productRepositoryMock.findAll).toHaveBeenCalledWith(expectedFilters);
  });
});




