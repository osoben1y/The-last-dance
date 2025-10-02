import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { ManyToOne, OneToMany } from 'typeorm';
import { Country } from '../../countries/entities/country.entity';
import { Airport } from '../../airports/entities/airport.entity';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'uuid' })
  countryId: string;

  @ManyToOne(() => Country, (country) => country.cities, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  country: Country;

  @OneToMany(() => Airport, (airport) => airport.city)
  airports: Airport[];

  @CreateDateColumn()
  createdAt: Date;
}
