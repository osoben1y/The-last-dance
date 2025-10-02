import { IsUUID, IsString, Length, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'User ID (UUID format)',
    format: 'uuid'
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: 'Your flight has been delayed by 30 minutes',
    description: 'Notification message (2-255 characters)',
    minLength: 2,
    maxLength: 255
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  message: string;

  @ApiProperty({
    example: 'flight_delay',
    description: 'Notification type (2-20 characters)',
    minLength: 2,
    maxLength: 20
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  type: string;
}
