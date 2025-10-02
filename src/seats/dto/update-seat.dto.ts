import { PartialType } from '@nestjs/mapped-types';
import { CreateSeatDto } from './create-seat.dto';

/**
 * Update seat DTO - all fields are optional for partial updates
 * Inherits ApiProperty decorators from CreateSeatDto
 */
export class UpdateSeatDto extends PartialType(CreateSeatDto) {}
