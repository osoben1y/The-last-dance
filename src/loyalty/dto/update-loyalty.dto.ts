import { IsUUID, IsInt, Min, IsEnum, IsOptional } from 'class-validator';
import { LoyaltyLevel } from '../entities/loyalty.entity';

export class UpdateLoyaltyDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  points?: number;

  @IsOptional()
  @IsEnum(LoyaltyLevel)
  level?: LoyaltyLevel;
}
