import { IsString, Length, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCountryDto {
  @ApiProperty({
    example: 'Uzbekistan',
    description: 'Country name (2-100 characters)',
    minLength: 2,
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @ApiProperty({
    example: 'UZ',
    description: 'Country code (2-10 characters)',
    minLength: 2,
    maxLength: 10
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 10)
  code: string;
}
