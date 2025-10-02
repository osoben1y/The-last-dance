import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { resSuccess } from '../utils/succes-response';
import { handleError } from '../utils/hande-error';
import { validateUUID } from '../utils/validate-uuid';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async create(dto: CreateReviewDto): Promise<object> {
    try {
      const review = this.reviewRepository.create(dto);
      const savedReview = await this.reviewRepository.save(review);
      return resSuccess({
        message: 'Review created successfully',
        data: savedReview,
      });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Review creation error' });
    }
  }

  async findAll(): Promise<object> {
    try {
      const reviews = await this.reviewRepository.find({
        relations: ['user', 'flight'],
      });
      return resSuccess({ data: reviews });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Review list error', data: [] });
    }
  }

  async findOne(id: string): Promise<object> {
    try {
      validateUUID(id, 'Review ID');
      const review = await this.reviewRepository.findOne({
        where: { id },
        relations: ['user', 'flight'],
      });
      if (!review) throw new NotFoundException('Review not found');
      return resSuccess({ data: review });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Review not found', data: null });
    }
  }

  async update(id: string, dto: UpdateReviewDto): Promise<object> {
    try {
      validateUUID(id, 'Review ID');
      const review = await this.reviewRepository.findOne({ where: { id } });
      if (!review) throw new NotFoundException('Review not found');
      Object.assign(review, dto);
      await this.reviewRepository.save(review);
      const updatedReview = await this.reviewRepository.findOne({
        where: { id },
      });
      return resSuccess({
        message: 'Review updated successfully',
        data: updatedReview,
      });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Review update error' });
    }
  }

  async remove(id: string): Promise<object> {
    try {
      validateUUID(id, 'Review ID');
      const review = await this.reviewRepository.findOne({ where: { id } });
      if (!review) throw new NotFoundException('Review not found');
      await this.reviewRepository.delete(id);
      return resSuccess({ message: 'Review deleted successfully' });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Review delete error' });
    }
  }
}
