import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Seat } from '../../seats/entities/seat.entity';
import { Flight } from '../../flight/entities/flight.entity';

@Entity('booking')
export class Booking {
  @Column({ type: 'uuid' })
  seatId: string;

  @ManyToOne(() => Seat)
  @JoinColumn({ name: 'seatId' })
  seat: Seat;
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'uuid' })
  flightId: string;

  @ManyToOne(() => Flight)
  @JoinColumn({ name: 'flightId' })
  flight: Flight;

  @Column({ type: 'text' })
  status: string;

  @Column({ type: 'decimal' })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
