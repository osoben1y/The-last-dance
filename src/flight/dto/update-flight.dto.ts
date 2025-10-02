import { IsUUID, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { FlightStatus } from '../entities/flight.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateFlightDto {
  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Updated plane ID (UUID format)',
    format: 'uuid'
  })
  @IsOptional()
  @IsUUID()
  planeId?: string;

  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'Updated departure airport ID (UUID format)',
    format: 'uuid'
  })
  @IsOptional()
  @IsUUID()
  fromAirportId?: string;

  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440002',
    description: 'Updated arrival airport ID (UUID format)',
    format: 'uuid'
  })
  @IsOptional()
  @IsUUID()
  toAirportId?: string;

  @ApiPropertyOptional({
    example: '2025-01-15T11:00:00Z',
    description: 'Updated departure time (ISO 8601 format)',
    format: 'date-time'
  })
  @IsOptional()
  @IsDateString()
  departureTime?: string;

  @ApiPropertyOptional({
    example: '2025-01-15T15:00:00Z',
    description: 'Updated arrival time (ISO 8601 format)',
    format: 'date-time'
  })
  @IsOptional()
  @IsDateString()
  arrivalTime?: string;

  @ApiPropertyOptional({
    example: 'DELAYED',
    description: 'Updated flight status',
    enum: FlightStatus,
    enumName: 'FlightStatus'
  })
  @IsOptional()
  @IsEnum(FlightStatus)
  status?: FlightStatus;
}
