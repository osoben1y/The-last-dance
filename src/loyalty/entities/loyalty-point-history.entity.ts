import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

export enum LoyaltyAction {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}

@Entity('loyalty_point_history')
export class LoyaltyPointHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'int' })
  point: number;

  @Column({ type: 'enum', enum: LoyaltyAction })
  action: LoyaltyAction;

  @CreateDateColumn()
  createdAt: Date;
}
