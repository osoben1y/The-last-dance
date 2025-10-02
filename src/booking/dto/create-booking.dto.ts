import { IsUUID, IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Seat ID (UUID format)',
    format: 'uuid'
  })
  @IsUUID()
  @IsNotEmpty()
  seatId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'User ID (UUID format)',
    format: 'uuid'
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440002',
    description: 'Flight ID (UUID format)',
    format: 'uuid'
  })
  @IsUUID()
  @IsNotEmpty()
  flightId: string;

  @ApiProperty({
    example: 'confirmed',
    description: 'Booking status'
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    example: 299.99,
    description: 'Booking price',
    type: 'number'
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
