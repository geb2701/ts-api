import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(authorId: number, title: string, content?: string) {
    const exists = await this.prisma.user.findUnique({ where: { id: authorId } });
    if (!exists) throw new BadRequestException('authorId inválido');

    return this.prisma.post.create({ data: { title, content, authorId } });
  }

  findAll() {
    return this.prisma.post.findMany({ include: { author: true } });
  }

  async publish(id: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    return this.prisma.post.update({ where: { id }, data: { published: true } });
  }
}