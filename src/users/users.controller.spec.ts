import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  // Mock mínimo del service con los métodos que use tu controller
  const usersServiceMock = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, email: 'a@b.com' }]),
    findOne: jest.fn().mockResolvedValue({ id: 1, email: 'a@b.com' }),
    create: jest.fn().mockResolvedValue({ id: 1 }),
    update: jest.fn().mockResolvedValue({ id: 1 }),
    remove: jest.fn().mockResolvedValue({ id: 1 }),
  } as Record<string, jest.Mock>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: usersServiceMock },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('GET /users -> findAll', async () => {
    const res = await controller.findAll();
    expect(res).toEqual([{ id: 1, email: 'a@b.com' }]);
    expect(usersServiceMock.findAll).toHaveBeenCalled();
  });

  it('GET /users/:id -> findOne', async () => {
    const res = await controller.findOne(1);
    expect(res).toEqual({ id: 1, email: 'a@b.com' });
    expect(usersServiceMock.findOne).toHaveBeenCalledWith(1); // si tu controller castea a number
  });

  it('POST /users -> create', async () => {
    const dto = { email: 'a@b.com', password: '123' }; // ajustá a tu DTO
    const res = await controller.create(dto as any);
    expect(res).toEqual({ id: 1 });
    expect(usersServiceMock.create).toHaveBeenCalledWith(dto);
  });

  it('PUT /users/:id -> update', async () => {
    const dto = { email: 'new@b.com' };
    const res = await controller.update(1, dto as any);
    expect(res).toEqual({ id: 1 });
    expect(usersServiceMock.update).toHaveBeenCalledWith(1, dto);
  });

  it('DELETE /users/:id -> remove', async () => {
    const res = await controller.remove(1);
    expect(res).toEqual({ id: 1 });
    expect(usersServiceMock.remove).toHaveBeenCalledWith(1);
  });
});
