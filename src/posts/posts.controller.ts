import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { PostResponse } from './dto/post.response';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Post creado', type: PostResponse })
  create(@Body() body: { authorId: number; title: string; content?: string }): Promise<PostResponse> {
    return this.postsService.create(body.authorId, body.title, body.content) as any;
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de posts', type: PostResponse, isArray: true })
  findAll(): Promise<PostResponse[]> {
    return this.postsService.findAll() as any;
  }

  @Patch(':id/publish')
  @ApiOkResponse({ description: 'Post publicado', type: PostResponse })
  publish(@Param('id', ParseIntPipe) id: number): Promise<PostResponse> {
    return this.postsService.publish(id) as any;
  }
}