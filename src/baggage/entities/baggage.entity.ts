import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Booking } from '../../booking/entities/booking.entity';

@Entity('baggage')
export class Baggage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  bookingId: string;

  @ManyToOne(() => Booking)
  @JoinColumn({ name: 'bookingId' })
  booking: Booking;

  @Column({ type: 'decimal' })
  weight: number;

  @Column({ type: 'varchar', length: 50 })
  type: string;

  @Column({ type: 'decimal' })
  price: number;
}
