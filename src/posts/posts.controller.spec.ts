// src/posts/posts.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;

  // mock mínimo del service con los métodos que uses en el controller
  const postsServiceMock = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, title: 'post' }]),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        { provide: PostsService, useValue: postsServiceMock },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('GET /posts -> findAll', async () => {
    const res = await controller.findAll();
    expect(res).toEqual([{ id: 1, title: 'post' }]);
    expect(postsServiceMock.findAll).toHaveBeenCalled();
  });
});
