import {
  IsUUID,
  IsNumber,
  IsString,
  Length,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBaggageDto {
  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Updated booking ID (UUID format)',
    format: 'uuid'
  })
  @IsUUID()
  @IsOptional()
  bookingId?: string;

  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'Updated user ID (UUID format)',
    format: 'uuid'
  })
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({
    example: 25.0,
    description: 'Updated baggage weight in kg (max 2 decimal places)',
    type: 'number',
    format: 'float'
  })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  weight?: number;

  @ApiPropertyOptional({
    example: 'carry_on',
    description: 'Updated baggage type (2-50 characters)',
    minLength: 2,
    maxLength: 50
  })
  @IsString()
  @Length(2, 50)
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({
    example: 75.00,
    description: 'Updated baggage price (max 2 decimal places)',
    type: 'number',
    format: 'float'
  })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  price?: number;
}
