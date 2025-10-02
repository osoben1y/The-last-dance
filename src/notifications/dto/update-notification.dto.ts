import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateNotificationDto {
  @ApiPropertyOptional({
    example: 'Your flight has been cancelled',
    description: 'Updated notification message',
  })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiPropertyOptional({
    example: 'flight_cancelled',
    description: 'Updated notification type',
  })
  @IsOptional()
  @IsString()
  type?: string;
}
