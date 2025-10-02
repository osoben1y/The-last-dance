import { IsString, IsUUID, Length, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'User ID (UUID format)',
    format: 'uuid'
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'Flight ID (UUID format)',
    format: 'uuid'
  })
  @IsUUID()
  flightId: string;

  @ApiProperty({
    example: 5,
    description: 'Rating (1-5 stars)',
    type: 'integer',
    minimum: 1,
    maximum: 5
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    example: 'Excellent service and comfortable flight!',
    description: 'Review comment (5-1000 characters)',
    minLength: 5,
    maxLength: 1000
  })
  @IsString()
  @Length(5, 1000)
  comment: string;
}
