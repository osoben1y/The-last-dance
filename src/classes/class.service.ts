import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class, ClassType } from './entities/class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { resSuccess } from '../utils/succes-response';
import { handleError } from '../utils/hande-error';
import { validateUUID } from '../utils/validate-uuid';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
  ) {}

  async create(dto: CreateClassDto): Promise<object> {
    try {
      const classEntity = this.classRepository.create(dto);
      const savedClass = await this.classRepository.save(classEntity);
      return resSuccess({
        message: 'Class created successfully',
        data: savedClass,
      });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Class creation error' });
    }
  }

  async findAll(): Promise<object> {
    try {
      const classes = await this.classRepository.find({ relations: ['seats'] });
      return resSuccess({ data: classes });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Class list error', data: [] });
    }
  }

  async findOne(id: string): Promise<object> {
    try {
      validateUUID(id, 'Class ID');
      const classEntity = await this.classRepository.findOne({
        where: { id },
        relations: ['seats'],
      });
      if (!classEntity) throw new NotFoundException('Class not found');
      return resSuccess({ data: classEntity });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Class not found', data: null });
    }
  }

  async update(id: string, dto: UpdateClassDto): Promise<object> {
    try {
      validateUUID(id, 'Class ID');
      const classEntity = await this.classRepository.findOne({ where: { id } });
      if (!classEntity) throw new NotFoundException('Class not found');
      Object.assign(classEntity, dto);
      await this.classRepository.save(classEntity);
      const updatedClass = await this.classRepository.findOne({
        where: { id },
      });
      return resSuccess({
        message: 'Class updated successfully',
        data: updatedClass,
      });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Class update error' });
    }
  }

  async remove(id: string): Promise<object> {
    try {
      validateUUID(id, 'Class ID');
      const classEntity = await this.classRepository.findOne({ where: { id } });
      if (!classEntity) throw new NotFoundException('Class not found');
      await this.classRepository.delete(id);
      return resSuccess({ message: 'Class deleted successfully' });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Class delete error' });
    }
  }
}
