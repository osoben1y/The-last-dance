import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { resSuccess } from '../utils/succes-response';
import { handleError } from '../utils/hande-error';
import { validateUUID } from '../utils/validate-uuid';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async create(dto: CreateBookingDto): Promise<object> {
    try {
      // O‘rindiq va vaqt bandligini tekshirish
      const seatRepo = this.bookingRepository.manager.getRepository('Seat');
      const seat = await seatRepo.findOne({
        where: { id: (dto as any).seatId },
        relations: ['class'],
      });
      if (!seat) throw new BadRequestException('Seat not found');
      if (!seat.class) throw new BadRequestException('Seat class not found');
      // O‘sha o‘rindiq va flight uchun bandlikni tekshirish
      const existingBooking = await this.bookingRepository.findOne({
        where: { flightId: dto.flightId, seatId: (dto as any).seatId },
      });
      if (existingBooking)
        throw new BadRequestException(
          'This seat is already booked for this flight/time',
        );
      const price = seat.class.price;

      // Booking yaratish
      const booking = this.bookingRepository.create({
        ...dto,
        price,
      });
      const savedBooking = await this.bookingRepository.save(booking);
      return resSuccess({
        message: 'Booking created successfully',
        data: savedBooking,
      });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Booking creation error' });
    }
  }

  async findAll(): Promise<object> {
    try {
      const bookings = await this.bookingRepository.find({
        relations: ['user', 'seat', 'flight'],
      });
      return resSuccess({ data: bookings });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Booking list error', data: [] });
    }
  }

  async findOne(id: string): Promise<object> {
    try {
      validateUUID(id, 'Booking ID');
      const booking = await this.bookingRepository.findOne({
        where: { id },
        relations: ['user', 'seat', 'flight'],
      });
      if (!booking) throw new NotFoundException('Booking not found');
      return resSuccess({ data: booking });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Booking not found', data: null });
    }
  }

  async update(id: string, dto: UpdateBookingDto): Promise<object> {
    try {
      validateUUID(id, 'Booking ID');
      const booking = await this.bookingRepository.findOne({ where: { id } });
      if (!booking) throw new NotFoundException('Booking not found');
      Object.assign(booking, dto);
      await this.bookingRepository.save(booking);
      const updatedBooking = await this.bookingRepository.findOne({
        where: { id },
      });
      return resSuccess({
        message: 'Booking updated successfully',
        data: updatedBooking,
      });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Booking update error' });
    }
  }

  async remove(id: string): Promise<object> {
    try {
      validateUUID(id, 'Booking ID');
      const booking = await this.bookingRepository.findOne({ where: { id } });
      if (!booking) throw new NotFoundException('Booking not found');
      await this.bookingRepository.delete(id);
      return resSuccess({ message: 'Booking deleted successfully' });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Booking delete error' });
    }
  }
}
