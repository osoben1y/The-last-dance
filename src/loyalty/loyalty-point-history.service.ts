import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  LoyaltyPointHistory,
  LoyaltyAction,
} from './entities/loyalty-point-history.entity';

@Injectable()
export class LoyaltyPointHistoryService {
  constructor(
    @InjectRepository(LoyaltyPointHistory)
    private readonly loyaltyPointHistoryRepository: Repository<LoyaltyPointHistory>,
  ) {}

  async addPoint(userId: string, point: number): Promise<LoyaltyPointHistory> {
    const history = this.loyaltyPointHistoryRepository.create({
      userId,
      point,
      action: LoyaltyAction.ADD,
    });
    return await this.loyaltyPointHistoryRepository.save(history);
  }

  async removePoint(
    userId: string,
    point: number,
  ): Promise<LoyaltyPointHistory> {
    const history = this.loyaltyPointHistoryRepository.create({
      userId,
      point,
      action: LoyaltyAction.REMOVE,
    });
    return await this.loyaltyPointHistoryRepository.save(history);
  }

  async getHistoryForUser(userId: string): Promise<LoyaltyPointHistory[]> {
    return await this.loyaltyPointHistoryRepository.find({
      where: { userId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }
}
