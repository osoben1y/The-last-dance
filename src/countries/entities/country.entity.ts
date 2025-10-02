import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { OneToMany } from 'typeorm';
import { City } from '../../cities/entities/city.entity';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  code: string;

  @OneToMany(() => City, (city) => city.country)
  cities: City[];

  @CreateDateColumn()
  createdAt: Date;
}
