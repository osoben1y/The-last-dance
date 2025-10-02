import {
  IsUUID,
  IsNumber,
  IsString,
  Length,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBaggageDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Booking ID (UUID format)',
    format: 'uuid'
  })
  @IsUUID()
  @IsNotEmpty()
  bookingId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'User ID (UUID format)',
    format: 'uuid'
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: 23.5,
    description: 'Baggage weight in kg (max 2 decimal places)',
    type: 'number',
    format: 'float'
  })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  weight: number;

  @ApiProperty({
    example: 'checked',
    description: 'Baggage type (2-50 characters)',
    minLength: 2,
    maxLength: 50
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  type: string;

  @ApiProperty({
    example: 50.00,
    description: 'Baggage price (max 2 decimal places)',
    type: 'number',
    format: 'float'
  })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  price: number;
}
