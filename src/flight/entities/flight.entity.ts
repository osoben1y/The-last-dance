import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Plane } from '../../planes/entities/plane.entity';
import { Airport } from '../../airports/entities/airport.entity';

export enum FlightStatus {
  SCHEDULED = 'SCHEDULED',
  DELAYED = 'DELAYED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

@Entity('flights')
export class Flight {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  planeId: string;

  @ManyToOne(() => Plane)
  @JoinColumn({ name: 'planeId' })
  plane: Plane;

  @Column({ type: 'uuid' })
  fromAirportId: string;

  @ManyToOne(() => Airport)
  @JoinColumn({ name: 'fromAirportId' })
  fromAirport: Airport;

  @Column({ type: 'uuid' })
  toAirportId: string;

  @ManyToOne(() => Airport)
  @JoinColumn({ name: 'toAirportId' })
  toAirport: Airport;

  @Column({ type: 'timestamp' })
  departureTime: Date;

  @Column({ type: 'timestamp' })
  arrivalTime: Date;

  @Column({ type: 'enum', enum: FlightStatus, default: FlightStatus.SCHEDULED })
  status: FlightStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
