import { IsUUID, IsDateString, IsEnum, IsNotEmpty } from 'class-validator';
import { FlightStatus } from '../entities/flight.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFlightDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Plane ID (UUID format)',
    format: 'uuid'
  })
  @IsUUID()
  planeId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'Departure airport ID (UUID format)',
    format: 'uuid'
  })
  @IsUUID()
  @IsNotEmpty()
  fromAirportId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440002',
    description: 'Arrival airport ID (UUID format)',
    format: 'uuid'
  })
  @IsUUID()
  @IsNotEmpty()
  toAirportId: string;

  @ApiProperty({
    example: '2025-01-15T10:30:00Z',
    description: 'Departure time (ISO 8601 format)',
    format: 'date-time'
  })
  @IsDateString()
  @IsNotEmpty()
  departureTime: string;

  @ApiProperty({
    example: '2025-01-15T14:45:00Z',
    description: 'Arrival time (ISO 8601 format)',
    format: 'date-time'
  })
  @IsDateString()
  @IsNotEmpty()
  arrivalTime: string;

  @ApiProperty({
    example: 'SCHEDULED',
    description: 'Flight status',
    enum: FlightStatus,
    enumName: 'FlightStatus'
  })
  @IsEnum(FlightStatus)
  @IsNotEmpty()
  status: FlightStatus;
}
