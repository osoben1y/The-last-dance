import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plane } from './entities/plane.entity';
import { CreatePlaneDto } from './dto/create-plane.dto';
import { UpdatePlaneDto } from './dto/update-plane.dto';
import { resSuccess } from '../utils/succes-response';
import { handleError } from '../utils/hande-error';
import { validateUUID } from '../utils/validate-uuid';

@Injectable()
export class PlaneService {
  constructor(
    @InjectRepository(Plane)
    private readonly planeRepository: Repository<Plane>,
  ) {}

  async create(dto: CreatePlaneDto): Promise<object> {
    try {
      const plane = this.planeRepository.create(dto);
      const savedPlane = await this.planeRepository.save(plane);
      return resSuccess({
        message: 'Plane created successfully',
        data: savedPlane,
      });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Plane creation error' });
    }
  }

  async findAll(): Promise<object> {
    try {
      const planes = await this.planeRepository.find();
      return resSuccess({ data: planes });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Plane list error', data: [] });
    }
  }

  async findOne(id: string): Promise<object> {
    try {
      validateUUID(id, 'Plane ID');
      const plane = await this.planeRepository.findOne({ where: { id } });
      if (!plane) throw new NotFoundException('Plane not found');
      return resSuccess({ data: plane });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Plane not found', data: null });
    }
  }

  async update(id: string, dto: UpdatePlaneDto): Promise<object> {
    try {
      validateUUID(id, 'Plane ID');
      const plane = await this.planeRepository.findOne({ where: { id } });
      if (!plane) throw new NotFoundException('Plane not found');
      Object.assign(plane, dto);
      await this.planeRepository.save(plane);
      const updatedPlane = await this.planeRepository.findOne({
        where: { id },
      });
      return resSuccess({
        message: 'Plane updated successfully',
        data: updatedPlane,
      });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Plane update error' });
    }
  }

  async remove(id: string): Promise<object> {
    try {
      validateUUID(id, 'Plane ID');
      const plane = await this.planeRepository.findOne({ where: { id } });
      if (!plane) throw new NotFoundException('Plane not found');
      await this.planeRepository.delete(id);
      return resSuccess({ message: 'Plane deleted successfully' });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Plane delete error' });
    }
  }
}
