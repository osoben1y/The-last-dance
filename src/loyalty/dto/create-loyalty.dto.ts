import { IsUUID, IsInt, Min, IsEnum, IsOptional } from 'class-validator';
import { LoyaltyLevel } from '../entities/loyalty.entity';

export class CreateLoyaltyDto {
  @IsUUID()
  userId: string;

  @IsInt()
  @Min(0)
  points: number;

  @IsEnum(LoyaltyLevel)
  @IsOptional()
  level?: LoyaltyLevel;
}
