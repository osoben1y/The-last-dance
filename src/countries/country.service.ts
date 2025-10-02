import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { resSuccess } from '../utils/succes-response';
import { handleError } from '../utils/hande-error';
import { validateUUID } from '../utils/validate-uuid';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async create(dto: CreateCountryDto): Promise<object> {
    try {
      const country = this.countryRepository.create(dto);
      const savedCountry = await this.countryRepository.save(country);
      return resSuccess({
        message: 'Country created successfully',
        data: savedCountry,
      });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Country creation error' });
    }
  }

  async findAll(): Promise<object> {
    try {
      const countries = await this.countryRepository.find({
        relations: ['cities'],
      });
      return resSuccess({ data: countries });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Country list error', data: [] });
    }
  }

  async findOne(id: string): Promise<object> {
    try {
      validateUUID(id, 'Country ID');
      const country = await this.countryRepository.findOne({
        where: { id },
        relations: ['cities'],
      });
      if (!country) throw new NotFoundException('Country not found');
      return resSuccess({ data: country });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Country not found', data: null });
    }
  }

  async update(id: string, dto: UpdateCountryDto): Promise<object> {
    try {
      validateUUID(id, 'Country ID');
      const country = await this.countryRepository.findOne({ where: { id } });
      if (!country) throw new NotFoundException('Country not found');
      Object.assign(country, dto);
      await this.countryRepository.save(country);
      const updatedCountry = await this.countryRepository.findOne({
        where: { id },
      });
      return resSuccess({
        message: 'Country updated successfully',
        data: updatedCountry,
      });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Country update error' });
    }
  }

  async remove(id: string): Promise<object> {
    try {
      validateUUID(id, 'Country ID');
      const country = await this.countryRepository.findOne({ where: { id } });
      if (!country) throw new NotFoundException('Country not found');
      await this.countryRepository.delete(id);
      return resSuccess({ message: 'Country deleted successfully' });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Country delete error' });
    }
  }
}
