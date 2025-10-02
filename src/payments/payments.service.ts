import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { resSuccess } from '../utils/succes-response';
import { handleError } from '../utils/hande-error';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Booking } from '../booking/entities/booking.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) { }


  async create(dto: CreatePaymentDto): Promise<object> {
    try {
      // bookingId mavjudligini tekshirish
      const booking = await this.bookingRepository.findOne({ where: { id: dto.bookingId } });
      if (!booking) {
        throw new NotFoundException('Booking not found for this bookingId');
      }
      const payment = this.paymentRepository.create(dto);
      const saved = await this.paymentRepository.save(payment);
      return resSuccess({ data: saved });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Payment creation error' });
    }
  }

  async findAll(): Promise<object> {
    try {
      const payments = await this.paymentRepository.find({
        relations: ['booking'],
      });
      return resSuccess({ data: payments });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Payment list error', data: [] });
    }
  }

  async findOne(id: string): Promise<object> {
    try {
      const payment = await this.paymentRepository.findOne({
        where: { id },
        relations: ['booking'],
      });
      if (!payment) throw new NotFoundException('Payment not found');
      return resSuccess({ data: payment });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Payment not found', data: null });
    }
  }

  async update(id: string, dto: UpdatePaymentDto): Promise<object> {
    try {
      const payment = await this.paymentRepository.findOne({ where: { id } });
      if (!payment) throw new NotFoundException('Payment not found');
      // Agar bookingId o'zgartirilsa, mavjudligini tekshirish
      if (dto.bookingId) {
        const booking = await this.bookingRepository.findOne({ where: { id: dto.bookingId } });
        if (!booking) throw new NotFoundException('Booking not found for this bookingId');
      }
      Object.assign(payment, dto);
      const updated = await this.paymentRepository.save(payment);
      return resSuccess({ message: 'Payment updated successfully', data: updated });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Payment update error' });
    }
  }
  async remove(id: string): Promise<object> {
    try {
      const payment = await this.paymentRepository.findOne({ where: { id } });
      if (!payment) throw new NotFoundException('Payment not found');
      await this.paymentRepository.delete(id);
      return resSuccess({ message: 'Payment deleted successfully' });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Payment delete error' });
    }
  }
}
