import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Company } from '../../companies/entities/company.entity';

@Entity('planes')
export class Plane {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  model: string;

  @Column({ type: 'uuid' })
  companyId: string;

  @ManyToOne(() => Company) 
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column({ type: 'int' })
  seatsCount: number;

  @CreateDateColumn()
  createdAt: Date;
}
