import { PartialType } from '@nestjs/mapped-types';
import { CreateAirportDto } from './create-airport.dto';

/**
 * Update airport DTO - all fields are optional for partial updates
 * Inherits ApiProperty decorators from CreateAirportDto
 */
export class UpdateAirportDto extends PartialType(CreateAirportDto) {}
