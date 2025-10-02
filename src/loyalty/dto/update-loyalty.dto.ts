import { IsUUID, IsInt, Min, IsEnum, IsOptional } from 'class-validator';
import { LoyaltyLevel } from '../entities/loyalty.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLoyaltyDto {
  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'User ID (UUID format)',
    format: 'uuid'
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({
    example: 100,
    description: 'Loyalty points (minimum 0)',
    type: 'integer',
    minimum: 0
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  points?: number;

  @ApiPropertyOptional({
    example: 'BRONZE',
    description: 'Loyalty level',
    enum: LoyaltyLevel,
    enumName: 'LoyaltyLevel'
  })
  @IsOptional()
  @IsEnum(LoyaltyLevel)
  level?: LoyaltyLevel;
}
