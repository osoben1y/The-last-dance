import { IsString, IsUUID, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAirportDto {
  @ApiProperty({
    example: 'Tashkent International Airport',
    description: 'Airport name (2-100 characters)',
    minLength: 2,
    maxLength: 100
  })
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'City ID (UUID format)',
    format: 'uuid'
  })
  @IsUUID()
  cityId: string;

  @ApiProperty({
    example: 'TAS',
    description: 'Airport code (2-10 characters)',
    minLength: 2,
    maxLength: 10
  })
  @IsString()
  @Length(2, 10)
  code: string;
}
