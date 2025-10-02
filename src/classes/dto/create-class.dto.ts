import { IsEnum, IsNumber, Min } from 'class-validator';
import { ClassType } from '../entities/class.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClassDto {
  @ApiProperty({
    example: 'BUSINESS',
    description: 'Flight class type',
    enum: ClassType,
    enumName: 'ClassType'
  })
  @IsEnum(ClassType)
  name: ClassType;

  @ApiProperty({
    example: 500.00,
    description: 'Class price (minimum 0)',
    type: 'number',
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  price: number;
}
