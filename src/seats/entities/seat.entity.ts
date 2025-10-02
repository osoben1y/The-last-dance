import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Class } from '../../classes/entities/class.entity';
import { Plane } from '../../planes/entities/plane.entity';

@Entity('seats')
export class Seat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  planeId: string;

  @ManyToOne(() => Plane)
  @JoinColumn({ name: 'planeId' })
  plane: Plane;

  @Column({ type: 'varchar' })
  seatNumber: string;

  @Column({ type: 'uuid' })
  classId: string;

  @ManyToOne(() => Class, (classEntity) => classEntity.seats)
  @JoinColumn({ name: 'classId' })
  class: Class;

  @Column({ type: 'boolean' })
  isAvailable: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
