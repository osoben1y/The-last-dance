import { IsUUID, IsInt, Min, IsEnum, IsOptional } from 'class-validator';
import { LoyaltyLevel } from '../entities/loyalty.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLoyaltyDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'User ID (UUID format)',
    format: 'uuid'
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: 100,
    description: 'Initial loyalty points (minimum 0)',
    type: 'integer',
    minimum: 0
  })
  @IsInt()
  @Min(0)
  points: number;

  @ApiPropertyOptional({
    example: 'BRONZE',
    description: 'Loyalty level',
    enum: LoyaltyLevel,
    enumName: 'LoyaltyLevel'
  })
  @IsEnum(LoyaltyLevel)
  @IsOptional()
  level?: LoyaltyLevel;
}
