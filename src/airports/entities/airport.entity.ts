import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { ManyToOne } from 'typeorm';
import { City } from '../../cities/entities/city.entity';

@Entity('airports')
export class Airport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'uuid' })
  cityId: string;

  @ManyToOne(() => City, (city) => city.airports, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  city: City;

  @Column({ type: 'varchar' })
  code: string;

  @CreateDateColumn()
  createdAt: Date;
}
