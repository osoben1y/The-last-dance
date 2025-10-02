import { IsString, IsUUID, IsInt, Min, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaneDto {
  @ApiProperty({
    example: 'Boeing 737-800',
    description: 'Plane model (2-50 characters)',
    minLength: 2,
    maxLength: 50
  })
  @IsString()
  @Length(2, 50)
  model: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Company ID (UUID format)',
    format: 'uuid'
  })
  @IsUUID()
  companyId: string;

  @ApiProperty({
    example: 180,
    description: 'Number of seats (minimum 1)',
    type: 'integer',
    minimum: 1
  })
  @IsInt()
  @Min(1)
  seatsCount: number;
}
