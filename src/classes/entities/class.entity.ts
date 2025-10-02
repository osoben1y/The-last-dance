import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Seat } from '../../seats/entities/seat.entity';

export enum ClassType {
  ECONOMY = 'ECONOMY',
  BUSINESS = 'BUSINESS',
  FIRST = 'FIRST',
}

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ClassType })
  name: ClassType;

  @Column({ type: 'decimal' })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Seat, (seat) => seat.class)
  seats: Seat[];
}
