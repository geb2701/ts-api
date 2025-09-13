// src/posts/posts.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PrismaService } from '../prisma/prisma.service'; // ajusta el path

// Mock minimal de Prisma usado por PostsService
const prismaMock = {
  post: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
} as unknown as PrismaService;

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ejemplo de test real (ajustá al método que tengas)
  it('findAll devuelve lista', async () => {
    (prismaMock.post.findMany as jest.Mock).mockResolvedValue([{ id: 1 }]);
    const res = await service.findAll?.(); // o el método que uses
    expect(res).toEqual([{ id: 1 }]);
    expect(prismaMock.post.findMany).toHaveBeenCalled();
  });
});
