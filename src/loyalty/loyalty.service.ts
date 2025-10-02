import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loyalty } from './entities/loyalty.entity';
import { CreateLoyaltyDto } from './dto/create-loyalty.dto';
import { UpdateLoyaltyDto } from './dto/update-loyalty.dto';
import { handleError } from '../utils/hande-error';
import { resSuccess } from '../utils/succes-response';
import { validateUUID } from '../utils/validate-uuid';

@Injectable()
export class LoyaltyService {
  constructor(
    @InjectRepository(Loyalty)
    private readonly loyaltyRepository: Repository<Loyalty>,
  ) {}

  async create(dto: CreateLoyaltyDto): Promise<object> {
    try {
      // UserId unique validation (har bir user uchun bitta loyalty)
      const existing = await this.loyaltyRepository.findOne({
        where: { userId: dto.userId },
      });
      if (existing) throw new Error('User already has loyalty record');
      const loyalty = this.loyaltyRepository.create(dto);
      const savedLoyalty = await this.loyaltyRepository.save(loyalty);
      return resSuccess({
        message: 'Loyalty created successfully',
        data: savedLoyalty,
      });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Loyalty creation error' });
    }
  }

  async findAll(): Promise<object> {
    try {
      const loyalties = await this.loyaltyRepository.find();
      return resSuccess({ data: loyalties });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Loyalty list error', data: [] });
    }
  }

  async findOne(id: string): Promise<object> {
    try {
      validateUUID(id, 'Loyalty ID');
      const loyalty = await this.loyaltyRepository.findOne({ where: { id } });
      if (!loyalty) throw new Error('Loyalty not found');
      return resSuccess({ data: loyalty });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Loyalty not found', data: null });
    }
  }

  async update(id: string, dto: UpdateLoyaltyDto): Promise<object> {
    try {
      validateUUID(id, 'Loyalty ID');
      const loyalty = await this.loyaltyRepository.findOne({ where: { id } });
      if (!loyalty) throw new Error('Loyalty not found');
      // UserId unique validation (update uchun)
      if (dto.userId && dto.userId !== loyalty.userId) {
        const existing = await this.loyaltyRepository.findOne({
          where: { userId: dto.userId },
        });
        if (existing && existing.id !== id)
          throw new Error('User already has loyalty record');
      }
      Object.assign(loyalty, dto);
      await this.loyaltyRepository.save(loyalty);
      const updatedLoyalty = await this.loyaltyRepository.findOne({
        where: { id },
      });
      return resSuccess({
        message: 'Loyalty updated successfully',
        data: updatedLoyalty,
      });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Loyalty update error' });
    }
  }

  async remove(id: string): Promise<object> {
    try {
      validateUUID(id, 'Loyalty ID');
      const loyalty = await this.loyaltyRepository.findOne({ where: { id } });
      if (!loyalty) throw new Error('Loyalty not found');
      await this.loyaltyRepository.delete(id);
      return resSuccess({ message: 'Loyalty deleted successfully' });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Loyalty delete error' });
    }
  }
}
