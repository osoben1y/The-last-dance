import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Baggage } from './entities/baggage.entity';
import { resSuccess } from '../utils/succes-response';
import { handleError } from '../utils/hande-error';
import { CreateBaggageDto } from './dto/create-baggage.dto';
import { UpdateBaggageDto } from './dto/update-baggage.dto';

@Injectable()
export class BaggageService {
  constructor(
    @InjectRepository(Baggage)
    private readonly baggageRepository: Repository<Baggage>,
  ) {}

  async create(dto: CreateBaggageDto): Promise<object> {
    try {
      const baggage = this.baggageRepository.create(dto);
      const saved = await this.baggageRepository.save(baggage);
      return resSuccess({ data: saved });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Baggage creation error' });
    }
  }

  async findAll(): Promise<object> {
    try {
      const baggages = await this.baggageRepository.find({
        relations: ['booking'],
      });
      return resSuccess({ data: baggages });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Baggage list error', data: [] });
    }
  }

  async findOne(id: string): Promise<object> {
    try {
      const baggage = await this.baggageRepository.findOne({
        where: { id },
        relations: ['booking'],
      });
      if (!baggage) throw new NotFoundException('Baggage not found');
      return resSuccess({ data: baggage });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Baggage not found', data: null });
    }
  }
  async update(id: string, dto: UpdateBaggageDto): Promise<object> {
    try {
      const baggage = await this.baggageRepository.findOne({ where: { id } });
      if (!baggage) throw new NotFoundException('Baggage not found');
      Object.assign(baggage, dto);
      const updated = await this.baggageRepository.save(baggage);
      return resSuccess({ data: updated });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Baggage update error' });
    }
  }

  async remove(id: string): Promise<object> {
    try {
      const baggage = await this.baggageRepository.findOne({ where: { id } });
      if (!baggage) throw new NotFoundException('Baggage not found');
      await this.baggageRepository.delete(id);
      return resSuccess({ message: 'Baggage deleted successfully' });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Error deleting baggage' });
    }
  }
}
