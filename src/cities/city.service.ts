import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { resSuccess } from '../utils/succes-response';
import { handleError } from '../utils/hande-error';
import { validateUUID } from '../utils/validate-uuid';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  async create(dto: CreateCityDto): Promise<object> {
    try {
      const city = this.cityRepository.create(dto);
      const savedCity = await this.cityRepository.save(city);
      return resSuccess({
        message: 'City created successfully',
        data: savedCity,
      });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'City creation error' });
    }
  }

  async findAll(): Promise<object> {
    try {
      const cities = await this.cityRepository.find({ relations: ['country'] });
      return resSuccess({ data: cities });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'City list error', data: [] });
    }
  }

  async findOne(id: string): Promise<object> {
    try {
      validateUUID(id, 'City ID');
      const city = await this.cityRepository.findOne({
        where: { id },
        relations: ['country'],
      });
      if (!city) throw new NotFoundException('City not found');
      return resSuccess({ data: city });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'City not found', data: null });
    }
  }

  async update(id: string, dto: UpdateCityDto): Promise<object> {
    try {
      validateUUID(id, 'City ID');
      const city = await this.cityRepository.findOne({ where: { id } });
      if (!city) throw new NotFoundException('City not found');
      Object.assign(city, dto);
      await this.cityRepository.save(city);
      const updatedCity = await this.cityRepository.findOne({ where: { id } });
      return resSuccess({
        message: 'City updated successfully',
        data: updatedCity,
      });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'City update error' });
    }
  }

  async remove(id: string): Promise<object> {
    try {
      validateUUID(id, 'City ID');
      const city = await this.cityRepository.findOne({ where: { id } });
      if (!city) throw new NotFoundException('City not found');
      await this.cityRepository.delete(id);
      return resSuccess({ message: 'City deleted successfully' });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'City delete error' });
    }
  }
}
