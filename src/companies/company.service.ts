import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { resSuccess } from '../utils/succes-response';
import { handleError } from '../utils/hande-error';
import { validateUUID } from '../utils/validate-uuid';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(dto: CreateCompanyDto): Promise<object> {
    try {
      const company = this.companyRepository.create(dto);
      const savedCompany = await this.companyRepository.save(company);
      return resSuccess({
        message: 'Company created successfully',
        data: savedCompany,
      });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Company creation error' });
    }
  }

  async findAll(): Promise<object> {
    try {
      const companies = await this.companyRepository.find({
        relations: ['country'],
      });
      return resSuccess({ data: companies });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Company list error', data: [] });
    }
  }

  async findOne(id: string): Promise<object> {
    try {
      validateUUID(id, 'Company ID');
      const company = await this.companyRepository.findOne({
        where: { id },
        relations: ['country'],
      });
      if (!company) throw new NotFoundException('Company not found');
      return resSuccess({ data: company });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Company not found', data: null });
    }
  }

  async update(id: string, dto: UpdateCompanyDto): Promise<object> {
    try {
      validateUUID(id, 'Company ID');
      const company = await this.companyRepository.findOne({ where: { id } });
      if (!company) throw new NotFoundException('Company not found');
      Object.assign(company, dto);
      await this.companyRepository.save(company);
      const updatedCompany = await this.companyRepository.findOne({
        where: { id },
      });
      return resSuccess({
        message: 'Company updated successfully',
        data: updatedCompany,
      });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Company update error' });
    }
  }

  async remove(id: string): Promise<object> {
    try {
      validateUUID(id, 'Company ID');
      const company = await this.companyRepository.findOne({ where: { id } });
      if (!company) throw new NotFoundException('Company not found');
      await this.companyRepository.delete(id);
      return resSuccess({ message: 'Company deleted successfully' });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Company delete error' });
    }
  }
}
