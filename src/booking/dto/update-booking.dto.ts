import { IsUUID, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBookingDto {
  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'Updated user ID (UUID format)',
    format: 'uuid'
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440002',
    description: 'Updated flight ID (UUID format)',
    format: 'uuid'
  })
  @IsOptional()
  @IsUUID()
  flightId?: string;

  @ApiPropertyOptional({
    example: 'cancelled',
    description: 'Updated booking status'
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({
    example: 0.00,
    description: 'Updated booking price',
    type: 'number'
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Updated seat ID (UUID format)',
    format: 'uuid'
  })
  @IsOptional()
  @IsUUID()
  seatId?: string;
}
