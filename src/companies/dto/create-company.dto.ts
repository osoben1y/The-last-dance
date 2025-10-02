import { IsString, Length, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({
    example: 'Uzbekistan Airways',
    description: 'Company name (2-100 characters)',
    minLength: 2,
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @ApiProperty({
    example: 'UZ',
    description: 'Company code (2-50 characters)',
    minLength: 2,
    maxLength: 50
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  code: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Country ID (UUID format)',
    format: 'uuid'
  })
  @IsUUID()
  @IsNotEmpty()
  countryId: string;
}
