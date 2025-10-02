import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Airport } from './entities/airport.entity';
import { CreateAirportDto } from './dto/create-airport.dto';
import { UpdateAirportDto } from './dto/update-airport.dto';
import { resSuccess } from '../utils/succes-response';
import { handleError } from '../utils/hande-error';

@Injectable()
export class AirportService {
  constructor(
    @InjectRepository(Airport)
    private readonly airportRepository: Repository<Airport>,
  ) {}

  async create(dto: CreateAirportDto): Promise<object> {
    try {
      const airport = this.airportRepository.create(dto);
      const saved = await this.airportRepository.save(airport);
      return resSuccess({ data: saved });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Airport creation error' });
    }
  }

  async findAll(): Promise<object> {
    try {
      const airports = await this.airportRepository.find({
        relations: ['city'],
      });
      return resSuccess({ data: airports });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Airport list error', data: [] });
    }
  }

  async findOne(id: string): Promise<object> {
    try {
      const airport = await this.airportRepository.findOne({
        where: { id },
        relations: ['city'],
      });
      if (!airport) throw new NotFoundException('Airport not found');
      return resSuccess({ data: airport });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Airport not found', data: null });
    }
  }

  async update(id: string, dto: UpdateAirportDto): Promise<object> {
    try {
      await this.airportRepository.update(id, dto);
      return this.findOne(id);
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Airport update error' });
    }
  }

  async remove(id: string): Promise<object> {
    try {
      await this.airportRepository.delete(id);
      return resSuccess({ message: 'Airport deleted successfully' });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Airport delete error' });
    }
  }
}
