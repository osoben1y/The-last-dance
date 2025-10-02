import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({
    example: 'John Admin',
    description: 'Admin full name (minimum 2 characters)',
    minLength: 2
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'admin@example.com',
    description: 'Admin email address',
    format: 'email'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'admin123456',
    description: 'Admin password (minimum 6 characters)',
    minLength: 6
  })
  @IsString()
  @MinLength(6)
  password: string;
}
