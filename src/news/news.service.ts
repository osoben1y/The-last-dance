import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { resSuccess } from '../utils/succes-response';
import { handleError } from '../utils/hande-error';
import { validateUUID } from '../utils/validate-uuid';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async create(dto: CreateNewsDto): Promise<object> {
    try {
      const news = this.newsRepository.create(dto);
      const savedNews = await this.newsRepository.save(news);
      return resSuccess({
        message: 'News created successfully',
        data: savedNews,
      });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'News creation error' });
    }
  }

  async findAll(): Promise<object> {
    try {
      const newsList = await this.newsRepository.find({
        relations: ['author'],
      });
      return resSuccess({ data: newsList });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'News list error', data: [] });
    }
  }

  async findOne(id: string): Promise<object> {
    try {
      validateUUID(id, 'News ID');
      const news = await this.newsRepository.findOne({
        where: { id },
        relations: ['author'],
      });
      if (!news) throw new NotFoundException('News not found');
      return resSuccess({ data: news });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'News not found', data: null });
    }
  }

  async update(id: string, dto: UpdateNewsDto): Promise<object> {
    try {
      validateUUID(id, 'News ID');
      const news = await this.newsRepository.findOne({ where: { id } });
      if (!news) throw new NotFoundException('News not found');
      Object.assign(news, dto);
      await this.newsRepository.save(news);
      const updatedNews = await this.newsRepository.findOne({ where: { id } });
      return resSuccess({
        message: 'News updated successfully',
        data: updatedNews,
      });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'News update error' });
    }
  }

  async remove(id: string): Promise<object> {
    try {
      validateUUID(id, 'News ID');
      const news = await this.newsRepository.findOne({ where: { id } });
      if (!news) throw new NotFoundException('News not found');
      await this.newsRepository.delete(id);
      return resSuccess({ message: 'News deleted successfully' });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'News delete error' });
    }
  }
}
