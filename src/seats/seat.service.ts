import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from './entities/seat.entity';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { resSuccess } from '../utils/succes-response';
import { handleError } from '../utils/hande-error';
import { validateUUID } from '../utils/validate-uuid';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
  ) {}

  async create(dto: CreateSeatDto): Promise<object> {
    try {
      // Bir samolyotda bir xil seatNumber borligini tekshirish
      const existing = await this.seatRepository.findOne({
        where: {
          planeId: dto.planeId,
          seatNumber: dto.seatNumber,
        },
      });
      if (existing) {
        throw new BadRequestException('Seat number already exists in this plane');
      }
      const seat = this.seatRepository.create(dto);
      const savedSeat = await this.seatRepository.save(seat);
      return resSuccess({
        message: 'Seat created successfully',
        data: savedSeat,
      });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Seat creation error' });
    }
  }

  async findAll(): Promise<object> {
    try {
      const seats = await this.seatRepository.find({
        relations: ['plane', 'class'],
      });
      return resSuccess({ data: seats });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Seat list error', data: [] });
    }
  }

  async findOne(id: string): Promise<object> {
    try {
      validateUUID(id, 'Seat ID');
      const seat = await this.seatRepository.findOne({
        where: { id },
        relations: ['plane', 'class'],
      });
      if (!seat) throw new NotFoundException('Seat not found');
      return resSuccess({ data: seat });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Seat not found', data: null });
    }
  }

  async update(id: string, dto: UpdateSeatDto): Promise<object> {
    try {
      validateUUID(id, 'Seat ID');
      const seat = await this.seatRepository.findOne({
        where: { id },
        relations: ['plane', 'class'],
      });
      if (!seat) throw new NotFoundException('Seat not found');
      Object.assign(seat, dto);
      await this.seatRepository.save(seat);
      const updatedSeat = await this.seatRepository.findOne({
        where: { id },
        relations: ['plane', 'class'],
      });
      return resSuccess({
        message: 'Seat updated successfully',
        data: updatedSeat,
      });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Seat update error' });
    }
  }

  async remove(id: string): Promise<object> {
    try {
      validateUUID(id, 'Seat ID');
      const seat = await this.seatRepository.findOne({ where: { id } });
      if (!seat) throw new NotFoundException('Seat not found');
      await this.seatRepository.delete(id);
      return resSuccess({ message: 'Seat deleted successfully' });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Seat delete error' });
    }
  }
}
