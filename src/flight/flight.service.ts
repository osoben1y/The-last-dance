import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './entities/flight.entity';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { handleError } from '../utils/hande-error';
import { resSuccess } from '../utils/succes-response';
import { validateUUID } from '../utils/validate-uuid';

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
  ) {}

  async create(dto: CreateFlightDto): Promise<object> {
    try {
      // Bir vaqtda bir yo'nalishda flight borligini tekshirish
      const existing = await this.flightRepository.findOne({
        where: {
          fromAirportId: dto.fromAirportId,
          toAirportId: dto.toAirportId,
          departureTime: new Date(dto.departureTime),
        },
      });
      if (existing) {
        return resSuccess({
          message: 'A flight for this route at the specified time already exists',
          data: null,
        });
      }
      const flight = this.flightRepository.create(dto);
      const savedFlight = await this.flightRepository.save(flight);
      return resSuccess({
        message: 'Flight created successfully',
        data: savedFlight,
      });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Flight creation error' });
    }
  }

  async findAll(): Promise<object> {
    try {
      const flights = await this.flightRepository.find({
        relations: ['plane', 'fromAirport', 'toAirport'],
      });
      return resSuccess({ data: flights });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Flight list error', data: [] });
    }
  }

  async findOne(id: string): Promise<object> {
    try {
      validateUUID(id, 'Flight ID');
      const flight = await this.flightRepository.findOne({
        where: { id },
        relations: ['plane', 'fromAirport', 'toAirport'],
      });
      if (!flight) throw new Error('Flight not found');
      return resSuccess({ data: flight });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Flight not found', data: null });
    }
  }

  async update(id: string, dto: UpdateFlightDto): Promise<object> {
    try {
      validateUUID(id, 'Flight ID');
      const flight = await this.flightRepository.findOne({ where: { id } });
      if (!flight) throw new Error('Flight not found');
      Object.assign(flight, dto);
      await this.flightRepository.save(flight);
      const updatedFlight = await this.flightRepository.findOne({
        where: { id },
      });
      return resSuccess({
        message: 'Flight updated successfully',
        data: updatedFlight,
      });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Flight update error' });
    }
  }

  async remove(id: string): Promise<object> {
    try {
      validateUUID(id, 'Flight ID');
      const flight = await this.flightRepository.findOne({ where: { id } });
      if (!flight) throw new Error('Flight not found');
      await this.flightRepository.delete(id);
      return resSuccess({ message: 'Flight deleted successfully' });
    } catch (error) {
      handleError(error);
      return resSuccess({ message: 'Flight delete error' });
    }
  }
}
