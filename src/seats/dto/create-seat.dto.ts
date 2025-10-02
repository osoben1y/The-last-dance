import { IsString, IsUUID, Length, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSeatDto {
  @ApiProperty({
    example: '12A',
    description: 'Seat number (1-10 characters)',
    minLength: 1,
    maxLength: 10
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  seatNumber: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Plane ID (UUID format)',
    format: 'uuid'
  })
  @IsUUID()
  @IsNotEmpty()
  planeId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'Class ID (UUID format)',
    format: 'uuid'
  })
  @IsUUID()
  @IsNotEmpty()
  classId: string;

  @ApiProperty({
    example: true,
    description: 'Seat availability status',
    default: true
  })
  @IsBoolean()
  isAvailable: boolean = true;
}
