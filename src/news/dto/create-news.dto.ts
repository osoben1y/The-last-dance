import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty({
    example: 'New Flight Routes Added',
    description: 'News article title (5-200 characters)',
    minLength: 5,
    maxLength: 200
  })
  @IsString()
  @Length(5, 200)
  title: string;

  @ApiProperty({
    example: 'We are excited to announce new flight routes to popular destinations...',
    description: 'News article content (10-2000 characters)',
    minLength: 10,
    maxLength: 2000
  })
  @IsString()
  @Length(10, 2000)
  content: string;
}
